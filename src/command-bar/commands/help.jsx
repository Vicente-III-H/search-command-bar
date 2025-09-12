const HELP_MESSAGE = `--- SEARCHING WITH COMMANDS ---
To search using the command bar, enter a search command followed by the search prompt into the command bar
e.g. To search for square watermelons on google.com, enter "g square watermelons" into the command bar

To see the list of available search commands, enter "sl" into the command bar

--- ADDING SEARCH COMMANDS ---
To add a custom search command, enter the command "sadd" followed by a command name, the name of the website, and its URL
e.g. To add youtube.com as a search command, enter "sadd y YouTube https://youtube.com/results?search_query="

To delete a search command, enter "sdel" followed by the name of the command into the command bar

To reset the list of search commands to the default values, enter "sreset" into the command bar

--- HELP COMMAND ---
Enter "help" into the command bar to see these instructions again
Enter "cl" into the command bar to see the list of regular commands`;

const help = ({ setOutput }) => {
    setOutput(HELP_MESSAGE);
}

export { help, HELP_MESSAGE }