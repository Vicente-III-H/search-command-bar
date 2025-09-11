import * as browserAPI from "./chrome";
import searchAdd from "./commands/search-add";
import searchList from "./commands/search-list";
import storageClear from "./commands/storage-clear";
import { fetchCommand, fetchHelper } from "./commands/fetch";
import clearOutput from "./commands/clear-output";
import searchDelete from "./commands/search-delete";
import help from "./commands/help";

const INITIAL_OUTPUT = `--- SEARCHING WITH COMMANDS ---
To search using the command bar, enter a search command followed by the search prompt into the command bar
e.g. To search for square watermelons on google.com, enter "g square watermelons" into the command bar

To see the list of available search commands, enter "sl" into the command bar

--- ADDING SEARCH COMMANDS ---
To add a custom search command, enter the command "sadd" followed by a command name, the name of the website, and its URL
e.g. To add youtube.com as a search command, enter "sadd y YouTube https://youtube.com/results?search_query="

To delete a search command, enter "sdel" followed by the name of the command into the command bar

To reset the list of search commands to its defaults, enter "sreset" into the command bar

--- HELP COMMAND ---
Enter "help" into the command bar to see these instructions again`;

const DEFAULT_SEARCH_CMDS = {
    "g": {alias: "Google", urlPieces: ["https://www.google.com/search?q="]},
    "y": {alias: "YouTube", urlPieces: ["https://youtube.com/results?search_query="]},
}

const NATIVE_CMDS = {
    "f": fetchCommand,
    "sl": searchList,
    "sadd": searchAdd,
    "sdel": searchDelete,
    "sreset": storageClear,
    "clear": clearOutput,
    "help": help,
}

const parseInput = (input) => input.trim().split(" ").filter((string) => string !== "");

const executeNativeCommand = (parsedInput, helpers) => {
    helpers.setCmdInput("");

    const cmd = parsedInput[0];
    let args = {
        "parsedInput": parsedInput,
        "getSearchCommands": getSearchCommands,
        "fetchHelper": fetchHelper,
        ...helpers
    };

    switch (cmd) {
        case "sclear":
            args["clearStorage"] = browserAPI.clearStorage;
            break;
        case "sadd":
            args["addSearchCmd"] = browserAPI.addSearchCmd;
            break;
        case "sdel":
            args["deleteSearchCmd"] = browserAPI.deleteSearchCmd;
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

        const min = Math.min(params, args);
        let urlString = "";
        for (let i = 0; i < min; i++) {
            urlString += cmdParams[i] + parsedInput[i + 1];
        }
        if (args > params) { urlString += " " + parsedInput.slice(params + 1).join(" ") }
        if (params > args) { urlString += cmdParams.slice(args).join("") }

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
        const args = parsedInput.length - 1;
        if (args >= 1) { executeSearchCommand(parsedInput, helpers) }
        return;
    }
}

const getSearchCommands = async () => {
    const searchCmds = await browserAPI.getSearchCmds(DEFAULT_SEARCH_CMDS);
    return searchCmds["search-commands"];
}

export { executeCommand, getSearchCommands, INITIAL_OUTPUT }