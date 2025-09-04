import { getSearchCmds, changeTabURL } from "./chrome";

const DEFAULT_SEARCH_CMDS = {
    "g": ["https://www.google.com/search?q="],
    "y": ["https://youtube.com/results?search_query="],
}

const NATIVE_CMDS = {

}

const parseInput = (input) => input.trim().split(" ").filter((string) => string !== "");

const executeNativeCommand = () => { return false }

const executeSearchCommand = (parsedInput, cmdParams) => {
    const args = parsedInput.length - 1;
    const params = cmdParams.length;
    let urlString = "";
    for (let i = 0; i < params; i++) {
        urlString += cmdParams[i] + parsedInput[i + 1];
    }
    urlString += " " + parsedInput.slice(params + 1).join(" ");
    changeTabURL(urlString);
}

const executeCommand = (input, commands) => {
    const parsedInput = parseInput(input);
    if (parsedInput.length === 0) { return }
    const cmd = parsedInput[0];
    
    if (executeNativeCommand()) { return }
    
    if (Object.hasOwn(commands["search-commands"], cmd)) {
        const args = parsedInput.length - 1;
        const params = commands["search-commands"][cmd].length;
        if (args < params) { return }
        if (executeSearchCommand(parsedInput, commands["search-commands"][cmd])) { return }
    }
}

const getCommands = async () => {
    const searchCmds = await getSearchCmds(DEFAULT_SEARCH_CMDS);
    return {...searchCmds, "native-commands": NATIVE_CMDS};
}

export { executeCommand, getCommands }