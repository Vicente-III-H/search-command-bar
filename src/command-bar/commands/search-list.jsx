const searchList = ({ fetchHelper, getSearchCommands, setSearchCommands, setOutput }) => {
    (async () => {
        const searchCommands = await fetchHelper(getSearchCommands, setSearchCommands);
        let output = "COMMAND - NAME [ URL_PIECES ]\n\n";
        for (const cmd in searchCommands) {
            output += cmd + " - " + searchCommands[cmd].alias + " [ " + searchCommands[cmd]["urlPieces"].join(", ") + " ]" + "\n"
        }
        setOutput(output.slice(0, -1));
    })();
}

export default searchList