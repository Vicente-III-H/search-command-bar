import * as browserAPI from "./chrome";
import searchList from "./commands/search-list";
import storageClear from "./commands/storage-clear";

const DEFAULT_SEARCH_CMDS = {
    "g": {alias: "Google", urlPieces: ["https://www.google.com/search?q="]},
    "y": {alias: "YouTube", urlPieces: ["https://youtube.com/results?search_query="]},
}

const NATIVE_CMDS = {
    "sl": searchList,
    "sclear": storageClear,
}

const parseInput = (input) => input.trim().split(" ").filter((string) => string !== "");

const executeNativeCommand = (parsedInput, commands, setOutput) => {
    const cmd = parsedInput[0];
    let args = {
        "parsedInput": parsedInput,
        "commands": commands,
        "setOutput": setOutput
    };
    switch (cmd) {
        case "sclear":
            args["clearStorage"] = browserAPI.clearStorage;
            break;
    }
    NATIVE_CMDS[cmd](args);
}

const executeSearchCommand = (parsedInput, cmdParams) => {
    const args = parsedInput.length - 1;
    const params = cmdParams.length;
    let urlString = "";
    for (let i = 0; i < params; i++) {
        urlString += cmdParams[i] + parsedInput[i + 1];
    }
    urlString += " " + parsedInput.slice(params + 1).join(" ");
    browserAPI.changeTabURL(urlString);
}

const executeCommand = (input, commands, setOutput) => {
    const parsedInput = parseInput(input);
    if (parsedInput.length === 0) { return }
    const cmd = parsedInput[0];

    if (Object.hasOwn(commands["native-commands"], cmd)) {
        executeNativeCommand(parsedInput, commands, setOutput);
        return;
    }
    
    if (Object.hasOwn(commands["search-commands"], cmd)) {
        const cmdParams = commands["search-commands"][cmd];
        const args = parsedInput.length - 1;
        const params = cmdParams.length;
        if (args < params) { return }
        executeSearchCommand(parsedInput, cmdParams);
        return;
    }
}

const getCommands = async () => {
    const searchCmds = await browserAPI.getSearchCmds(DEFAULT_SEARCH_CMDS);
    return {...searchCmds, "native-commands": NATIVE_CMDS};
}

export { executeCommand, getCommands }