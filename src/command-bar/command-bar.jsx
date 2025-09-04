import { useEffect, useState } from "react";
import { executeCommand, getSearchCommands } from "./execute";

function CommandBar({ setOutput }) {
    const [cmdInput, setCmdInput] = useState("");
    const [searchCommands, setSearchCommands] = useState({});
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        (async () => {
            setSearchCommands(await getSearchCommands());
            setEnabled(true);
        })();
    }, [])

    const onKeyDown = (event) => {
        const key = event.key;
        if (enabled && key === "Enter") {
            executeCommand(cmdInput, searchCommands, setSearchCommands, setOutput, setEnabled);
        }
    }

    return (
        <div id="command-bar">
            <input
                type="text"
                className={enabled ? "" : "disabled"}
                value={cmdInput}
                onChange={(event) => setCmdInput(event.target.value)}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

export default CommandBar