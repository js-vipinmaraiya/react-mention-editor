
// Import the necessary type definition for the Mention component's props
import { EntryComponentProps } from "@draft-js-plugins/mention/lib/MentionSuggestions/Entry/Entry";

// Define the Mention component
const Mention = (props: EntryComponentProps): JSX.Element => {
  // eslint-disable-line @typescript-eslint/no-unused-vars
  const {
    mention, // The mention object containing details like name and email
    theme, // Theme object used to apply custom styles
    selectMention, //  Function to handle mention selection (not used here)
    searchValue, // The current search value typed by the user (not used here)
    isFocused, // Whether this mention is currently focused in the suggestions list (not used here)
    ...parentProps // Any additional props passed to the Mention component
  } = props;

  return (
    <div {...parentProps}>
      {/* Wrapper for mention entry */}
      <div className={theme?.mentionSuggestionsEntryText}>
        {/* Display the mention's name */}
        <span>{mention.name}</span>
        {/* Display the mention's email with a separate style */}
        <span className={theme?.email}>{mention.email}</span>
      </div>
    </div>
  );
};

// Export the Mention component as default
export default Mention;
