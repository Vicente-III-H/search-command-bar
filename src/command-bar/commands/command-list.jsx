function commandList({ setOutput }) {
    const commandList = `COMMAND - DESCRIPTION
    
    cl - List of commands
    clear - Clear output
    f - Get latest search commands from storage
    help - Show guide
    sadd - Add a new search command
    sdel - Delete a search command
    sl - List of search commands
    sreset - Reset search commands storage to default commands
    
    To view the list of search commands, enter "sl" into the command bar`;
    setOutput(commandList);
}

export default commandList