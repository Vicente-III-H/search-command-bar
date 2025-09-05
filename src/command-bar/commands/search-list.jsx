const searchList = ({ fetchHelper, getSearchCommands, setSearchCommands, setOutput }) => {
    (async () => {
        const searchCommands = await fetchHelper(getSearchCommands, setSearchCommands);
        let output = "";
        for (const cmd in searchCommands) {
            output += cmd + " - " + searchCommands[cmd].alias + " [ " + searchCommands[cmd]["urlPieces"].join(", ") + " ]" + "\n"
        }
        setOutput(output.slice(0, -1));
    })();
}

export default searchList