const fetch = ({ setSearchCommands, getSearchCommands, setOutput, setEnabled }) => {
    (async () => {
        setEnabled(false);
        try {
            setSearchCommands(await getSearchCommands());
            setOutput("Search command list updated");
        } catch {
            setOutput("Could not fetch most recent search command list");
        } finally {
            setEnabled(true);
        }
    })();
}

export default fetch