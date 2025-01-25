// Import necessary dependencies and components from React and external libraries
import React, { useCallback, useMemo, useRef, useState } from "react";
import { convertToRaw, EditorState, RawDraftContentState } from "draft-js";
import _Editor, { PluginEditorProps } from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData,
} from "@draft-js-plugins/mention";
import Mention from "@/editor/mention";
import editorStyles from "@/editor/Editor.module.scss";
import mentionStyles from "@/editor/mention/Mention.module.scss";
import "draft-js/dist/Draft.css";

// Typecast the Editor to use React functional component with PluginEditorProps
const Editor = _Editor as unknown as React.FC<
  React.PropsWithChildren<PluginEditorProps>
>;

// Define an array of mentionable users
const mentions: Array<MentionData> = [
  { name: "Francisco Watson", email: "fwatson@example.com" },
  { name: "Ana Gibson", email: "agibson@example.com" },
  { name: "Vera Bell", email: "vbell@example.com" },
  { name: "Rosemary Flores", email: "rflores@example.com" },
];

// Custom editor component
const CustomEditor: React.FC = () => {
  // Reference to the editor instance for focus control
  const ref = useRef<_Editor>(null);

  // State to track the editor's content
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  // State to track if the mention suggestions dropdown is open
  const [open, setOpen] = useState(false);

  // State to store the current suggestions for mentions
  const [suggestions, setSuggestions] = useState(mentions);

  // Callback to handle opening and closing of mention suggestions
  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);

  // Callback to handle filtering of mentions based on user input
  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

  // Memoize the mention plugin to optimize performance
  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      entityMutability: "IMMUTABLE",
      theme: mentionStyles,
      mentionPrefix: "@",
      supportWhitespace: true,
    });
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  // Function to extract mentions from the editor's content
  const getMentions = useCallback((contentState: RawDraftContentState) => {
    const entityMap = contentState.entityMap;
    const users = [];
    for (const key in entityMap) {
      if (entityMap[key].data?.mention) {
        users.push(entityMap[key].data.mention);
      }
    }
    return users;
  }, []);

  // Function to get the current content of the editor and log it
  const getContent = () => {
    const rawState = convertToRaw(editorState.getCurrentContent());
    const mentions = getMentions(rawState);
    const uniqueMentions = Array.from(new Set(mentions)); // Remove duplicates
    console.log("Mentioned Users : ", getMentions(rawState));
    console.log("Unique Mentioned Users: ", uniqueMentions);
    console.log("Plain Text: ", editorState.getCurrentContent().getPlainText());
  };

  // Render the editor with mention functionality
  return (
    <div className={editorStyles.container}>
      {/* Editor container */}
      <div
        className={editorStyles.editor}
        onClick={() => {
          ref.current?.focus(); // Focus the editor when the container is clicked
        }}
      >
        <Editor
          editorState={editorState} // Editor state
          onChange={setEditorState} // Function to handle state change
          plugins={plugins} // Pass the mention plugins
          ref={ref} // Reference for the editor
        />
        {/* Mention suggestions dropdown */}
        <MentionSuggestions
          open={open} // Whether the suggestions dropdown is open
          onOpenChange={onOpenChange} // Handle dropdown open/close
          suggestions={suggestions} // Suggestions to display
          onSearchChange={onSearchChange} // Handle user input for suggestions
          entryComponent={Mention} // Custom component for suggestion entries
        />
      </div>
      {/* Button to fetch and log the editor content */}
      <button onClick={getContent} className={editorStyles.saveButton}>
        Get Content
      </button>
    </div>
  );
};

export default CustomEditor;
