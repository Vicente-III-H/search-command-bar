const searchDelete = ({ parsedInput, deleteSearchCmd, fetchHelper, getSearchCommands, setSearchCommands, setOutput, setEnabled }) => {
    const args = parsedInput.length - 1;
    if (args < 1) { return }
    
    (async () => {
        setEnabled(false);

        const deleteCmd = parsedInput[1];
        setOutput("Deleting command \"" + deleteCmd + "\"");
        try {
            let currCmds = await fetchHelper(getSearchCommands, setSearchCommands);
            if (Object.hasOwn(currCmds, deleteCmd)) {
                await deleteSearchCmd(deleteCmd);
                await fetchHelper(getSearchCommands, setSearchCommands);
                setOutput(currOutput => currOutput + "\n" + "Deleted command \"" + deleteCmd + "\"");
            } else {
                setOutput(currOutput => currOutput + "\n" + "Cannot find command \"" + deleteCmd + "\" in command list");
            }
        } catch {
            setOutput(currOutput => currOutput + "\n" + "Failed finishing deletion of command \"" + deleteCmd + "\"");
        } finally {
            setEnabled(true);
        }
    })();
}

export default searchDelete