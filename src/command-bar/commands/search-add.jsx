const searchAdd = ({ parsedInput, addSearchCmd, fetchHelper, getSearchCommands, setSearchCommands, setOutput, setEnabled }) => {
    const args = parsedInput.length - 1;
    if (args < 3) { return }
    if (parsedInput[1].includes(" ")) {
        setOutput("Failed to add command: command names cannot contain spaces");
        return;
    }
    
    (async () => {
        setEnabled(false);
        setOutput("Adding new command...");

        try {
            await addSearchCmd(parsedInput[1], parsedInput[2], parsedInput.slice(3));
            setOutput(currOutput => currOutput + "\n" + "Search command " + parsedInput[1] + " (\"" + parsedInput[2] + "\") has been added to storage");
            await fetchHelper(getSearchCommands, setSearchCommands);
            setOutput(currOutput => currOutput + "\n" + "Search command " + parsedInput[1] + " (\"" + parsedInput[2] + "\") can be used");
            setOutput(currOutput => currOutput + "\n\n" + `To view the list of search commands, enter "sl" into the command bar`);
        } catch {
            setOutput(currOutput => currOutput + "\n" + "Search command " + parsedInput[1] + " could not be added to storage");
        } finally {
            setEnabled(true);
        }
    })();
}

export default searchAdd