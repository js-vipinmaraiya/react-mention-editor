import React, { useCallback, useMemo, useRef, useState } from "react";
import { ContentState, convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from "draft-js";
import _Editor, { PluginEditorProps } from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData,
} from "@draft-js-plugins/mention";
import "draft-js/dist/Draft.css";
import Mention from "@/editor/mention";
import editorStyles from "@/editor/Editor.module.scss";
import mentionStyles from "@/editor/mention/Mention.module.scss";

const Editor = _Editor as unknown as React.FC<
  React.PropsWithChildren<PluginEditorProps>
>;

const mentions: Array<MentionData> = [
  { name: "Francisco Watson", email: "fwatson@example.com" },
  { name: "Ana Gibson", email: "agibson@example.com" },
  { name: "Vera Bell", email: "vbell@example.com" },
  { name: "Rosemary Flores", email: "rflores@example.com" },
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

  const getMentions = useCallback((contentState: RawDraftContentState)=>{
    const entityMap = contentState.entityMap
    const users = []
    for(const key in entityMap){
        users.push(entityMap[key].data.mention)
    }
    return users
  }, [])

  const saveContent = () => {
    const rawState = convertToRaw(editorState.getCurrentContent());
    // logic can write here to remove duplicate users
    console.log('Mentioned Users : ', getMentions(rawState))
    console.log('Plain text : ', editorState.getCurrentContent().getPlainText())
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
