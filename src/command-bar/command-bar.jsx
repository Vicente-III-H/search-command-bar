import { useEffect, useState } from "react";
import { getSearchCmds } from "./chrome";
import executeCommand from "./commands";

function CommandBar() {
    const [cmdInput, setCmdInput] = useState("");
    const [commands, setCommands] = useState({});

    useEffect(() => {
        (async () => {
            const searchCmds = await getSearchCmds();
            setCommands({...searchCmds});
        })();
    }, [])

    return (
        <div id="command-bar">
            <input
                type="text"
                value={cmdInput}
                onChange={(event) => setCmdInput(event.target.value)}
            />
            <button onClick={() => {executeCommand(cmdInput, commands)}}>Search</button>
        </div>
    )
}

export default CommandBar