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

const executeNativeCommand = (parsedInput, helpers) => {
    const cmd = parsedInput[0];
    let args = {
        "parsedInput": parsedInput,
        "searchCommands": helpers.searchCommands,
        "setOutput": helpers.setOutput,
        "setEnabled": helpers.setEnabled,
    };
    switch (cmd) {
        case "sclear":
            args["clearStorage"] = browserAPI.clearStorage;
            break;
    }
    NATIVE_CMDS[cmd](args);
}

const executeSearchCommand = (parsedInput, { searchCommands, setEnabled }) => {
    (async () => {
        setEnabled(false);
        
        const cmdParams = searchCommands[parsedInput[0]]["urlPieces"];
        const args = parsedInput.length - 1;
        const params = cmdParams.length;
        let urlString = "";
        for (let i = 0; i < params; i++) {
            urlString += cmdParams[i] + parsedInput[i + 1];
        }
        urlString += (args > params) ? " " + parsedInput.slice(params + 1).join(" ") : "";

        try {
            await browserAPI.changeTabURL(urlString);
        } finally {
            setEnabled(true);
        }
    })();
}

const executeCommand = (input, searchCommands, setOutput, setEnabled) => {
    const parsedInput = parseInput(input);
    if (parsedInput.length === 0) { return }
    const cmd = parsedInput[0];
    const helpers = {
        "searchCommands": searchCommands,
        "setOutput": setOutput,
        "setEnabled": setEnabled,
    }

    if (Object.hasOwn(NATIVE_CMDS, cmd)) {
        executeNativeCommand(parsedInput, helpers);
        return;
    }
    
    if (Object.hasOwn(searchCommands, cmd)) {
        const cmdParams = searchCommands[cmd]["urlPieces"];
        const args = parsedInput.length - 1;
        const params = cmdParams.length;
        if (args < params) { return }
        executeSearchCommand(parsedInput, helpers);
        return;
    }
}

const getSearchCommands = async () => {
    const searchCmds = await browserAPI.getSearchCmds(DEFAULT_SEARCH_CMDS);
    return searchCmds["search-commands"];
}

export { executeCommand, getSearchCommands }