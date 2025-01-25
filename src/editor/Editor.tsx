import React, { useCallback, useMemo, useRef, useState } from "react";
import { EditorState } from "draft-js";
import _Editor, { PluginEditorProps } from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import "draft-js/dist/Draft.css";
import Mention from "@/editor/mention";
import editorStyles from "@/editor/Editor.module.scss";
import mentionStyles from "@/editor/mention/Mention.module.scss";

const Editor = _Editor as unknown as React.FC<
  React.PropsWithChildren<PluginEditorProps>
>;

interface IMention {
  name: string;
}

const mentions: Array<IMention> = [
  { name: "React" },
  { name: "TypeScript" },
  { name: "Draft.js" },
  { name: "This is long text message" },
];

const CustomEditor: React.FC = () => {
  const ref = useRef<_Editor>(null);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

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

  const saveContent = () => {
    const rawContent = JSON.stringify(
      editorState.getCurrentContent().getPlainText()
    );
    console.log("Here is the content! ", rawContent);
    alert(`Here is the content! ${rawContent}`);
  };

  return (
    <div className={editorStyles.container}>
      <div
        className={editorStyles.editor}
        onClick={() => {
          ref.current!.focus();
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={ref}
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          onAddMention={() => {
            // get the mention object selected
          }}
          entryComponent={Mention}
        />
      </div>
      <button onClick={saveContent} className={editorStyles.saveButton}>
        Get Content
      </button>
    </div>
  );
};
export default CustomEditor;
