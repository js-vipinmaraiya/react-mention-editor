// Import the necessary type definition for the Mention component's props
import { EntryComponentProps } from "@draft-js-plugins/mention/lib/MentionSuggestions/Entry/Entry";

// Define a utility function to omit specific keys
const omit = (obj: Record<string, any>, keys: string[]) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!keys.includes(key)) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};

// Define the Mention component
const Mention = (props: EntryComponentProps): JSX.Element => {
  const {
    mention, // The mention object containing details like name and email
    theme, // Theme object used to apply custom styles
    ...parentProps // Any additional props passed to the Mention component
  } = props;

  // Use the custom omit function to exclude selectMention, searchValue, and isFocused
  const filteredProps = omit(parentProps, ["selectMention", "searchValue", "isFocused"]);

  return (
    <div {...filteredProps}>
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
