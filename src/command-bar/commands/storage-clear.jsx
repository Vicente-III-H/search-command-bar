const storageClear = ({ setOutput, setEnabled, clearStorage, fetchHelper, getSearchCommands, setSearchCommands }) => {
    (async () => {
        setEnabled(false);
        setOutput("Clearing command storage...");
        try {
            await clearStorage();
            setOutput(currOutput => currOutput + "\n" + "Storage cleared");
            await fetchHelper(getSearchCommands, setSearchCommands);
            setOutput(currOutput => currOutput + "\n" + "Default search commands set");
        } catch {
            setOutput(currOutput => currOutput + "\n" + "Could not clear storage properly");
        } finally {
            setEnabled(true);
        }
    })();
};

export default storageClear