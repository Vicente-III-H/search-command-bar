import * as browserAPI from "./chrome";
import searchAdd from "./commands/search-add";
import searchList from "./commands/search-list";
import storageClear from "./commands/storage-clear";
import { fetchCommand, fetch } from "./commands/fetch";

const DEFAULT_SEARCH_CMDS = {
    "g": {alias: "Google", urlPieces: ["https://www.google.com/search?q="]},
    "y": {alias: "YouTube", urlPieces: ["https://youtube.com/results?search_query="]},
}

const NATIVE_CMDS = {
    "f": fetchCommand,
    "sl": searchList,
    "sadd": searchAdd,
    "sclear": storageClear,
}

const parseInput = (input) => input.trim().split(" ").filter((string) => string !== "");

const executeNativeCommand = (parsedInput, helpers) => {
    helpers.setCmdInput("");

    const cmd = parsedInput[0];
    let args = {
        "parsedInput": parsedInput,
        "getSearchCommands": getSearchCommands,
        ...helpers
    };

    switch (cmd) {
        case "sl":
            args["fetch"] = fetch;
            break;
        case "sclear":
            args["clearStorage"] = browserAPI.clearStorage;
            break;
        case "sadd":
            args["addSearchCmd"] = browserAPI.addSearchCmd;
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

const executeCommand = (input, setCmdInput, searchCommands, setSearchCommands, setOutput, setEnabled) => {
    const parsedInput = parseInput(input);
    if (parsedInput.length === 0) { return }
    const cmd = parsedInput[0];
    const helpers = {
        "searchCommands": searchCommands,
        "setSearchCommands": setSearchCommands,
        "setCmdInput": setCmdInput,
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