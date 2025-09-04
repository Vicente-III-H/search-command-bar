const fetchCommand = ({ setSearchCommands, getSearchCommands, setOutput, setEnabled }) => {
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

const fetch = async (getSearchCommands, setSearchCommands) => {
    const currCmds = await getSearchCommands();
    setSearchCommands(currCmds);
    return currCmds;
}

export { fetchCommand, fetch }