import { useEffect, useState } from "react";
import { executeCommand, getCommands } from "./commands";

function CommandBar() {
    const [cmdInput, setCmdInput] = useState("");
    const [commands, setCommands] = useState({});

    useEffect(() => {
        (async () => {
            setCommands(await getCommands());
        })();
    }, [])

    const onKeyDown = (event) => {
        const key = event.key;
        if (key === "Enter") { executeCommand(cmdInput, commands) }
    }

    return (
        <div id="command-bar">
            <input
                type="text"
                value={cmdInput}
                onChange={(event) => setCmdInput(event.target.value)}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

export default CommandBar