import { EntryComponentProps } from "@draft-js-plugins/mention/lib/MentionSuggestions/Entry/Entry";

const Mention = (props: EntryComponentProps): JSX.Element => {
  const {
    mention,
    theme,
    selectMention, // eslint-disable-line @typescript-eslint/no-unused-vars
    searchValue, // eslint-disable-line @typescript-eslint/no-unused-vars
    isFocused, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
       <div className={theme?.mentionSuggestionsEntryText}>
        <span>{mention.name}</span>
        <span className={theme?.email}>{mention.email}</span>
       </div>
    </div>
  );
};

export default Mention;
