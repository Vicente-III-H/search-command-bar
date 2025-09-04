const searchAdd = ({ parsedInput, addSearchCmd, fetch, getSearchCommands, setSearchCommands, setOutput, setEnabled }) => {
    const args = parsedInput.length - 1;
    if (args < 3) { return }
    
    (async () => {
        setEnabled(false);
        setOutput("Adding new command...");

        try {
            await addSearchCmd(parsedInput[1], parsedInput[2], parsedInput.slice(3));
            setOutput(currOutput => currOutput + "\n" + "Search command " + parsedInput[1] + " (\"" + parsedInput[2] + "\") has been added to storage");
            await fetch(getSearchCommands, setSearchCommands);
            setOutput(currOutput => currOutput + "\n" + "Search command " + parsedInput[1] + " (\"" + parsedInput[2] + "\") can be used");
        } catch {
            setOutput(currOutput => currOutput + "\n" + "Search command " + parsedInput[1] + " could not be added to storage");
        } finally {
            setEnabled(true);
        }
    })();
}

export default searchAdd