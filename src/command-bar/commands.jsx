import { changeTabURL } from "./chrome";

const parseInput = (input) => input.trim().split(" ").filter((string) => string !== "");

const executeDefaultCommand = () => { return false }

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
    
    if (executeDefaultCommand()) { return }

    if (Object.hasOwn(commands["search-commands"], cmd)) {
        const args = parsedInput.length - 1;
        const params = commands["search-commands"][cmd].length;
        if (args < params) { return }
        if (executeSearchCommand(parsedInput, commands["search-commands"][cmd])) { return }
    }
}

export default executeCommand