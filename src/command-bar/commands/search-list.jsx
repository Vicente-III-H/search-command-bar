const searchList = ({ fetchHelper, getSearchCommands, setSearchCommands, setOutput }) => {
    (async () => {
        const searchCommands = await fetchHelper(getSearchCommands, setSearchCommands);
        let output = "COMMAND - NAME [ URL_PIECES ]\n\n";
        for (const cmd in searchCommands) {
            output += cmd + " - " + searchCommands[cmd].alias + " [ " + searchCommands[cmd]["urlPieces"].join(", ") + " ]" + "\n"
        }
        setOutput(output + `\n To view the list of regular commands, enter "cl" into the command bar`);
    })();
}

export default searchList