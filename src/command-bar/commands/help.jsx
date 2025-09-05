const help = ({ setOutput }) => {
    const message = `--- SEARCH COMMAND LIST ---
    To view available search commands, enter "sl" into the command bar
    i.e. sl
    Each line in the output lists properties of a search command. See "ADD SEARCH COMMAND" for properties explanation
    i.e. "SEARCH_COMMAND - ALIAS [ URL_PIECES... ]"
    
    --- SEARCH COMMANDS ---
    To use a search command, enter the search command then any subsequent arguments:
    i.e. SEARCH_COMMAND ARGUMENTS...
    SEARCH_COMMAND - Search command keyword
    ARGUMENTS - Arguments that will be passed into search command URL

    --- ADD SEARCH COMMAND ---
    To create a search command, enter "sadd"
    i.e. sadd SEARCH_COMMAND ALIAS URL_PIECES...
    SEARCH_COMMAND - Keyword used to call search command
    ALIAS - Alias name that appears in search command list
    URL_PIECES - Pieces of the destination URL. Any arguments entered with the search command will be subsequently appended to a URL Piece, one after another
    
    --- CLEAR OUTPUT ---
    To clear the terminal output, enter "clear"`;
    setOutput(message);
}

export default help