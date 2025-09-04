const storageClear = ({ setOutput, setEnabled, clearStorage }) => {
    (async () => {
        setEnabled(false);
        setOutput("Clearing command storage...");
        try {
            await clearStorage();
            setOutput(currOutput => currOutput + "\n" + "Storage cleared");
        } catch {
            setOutput(currOutput => currOutput + "\n" + "Could not clear storage");
        } finally {
            setEnabled(true);
        }
    })();
};

export default storageClear