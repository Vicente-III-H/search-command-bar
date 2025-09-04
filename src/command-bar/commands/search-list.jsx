export default searchList = (commands, setOutput) => {
    const searchCommands = commands["search-commands"];

    let output = "";
    for (const cmd in searchCommands) {
        output += cmd + " - " + searchCommands[cmd].alias + " (" + searchCommands[cmd]["urlPieces"].join(" ") + ")" + "\n"
    }

    setOutput(output.slice(0, -1));
}