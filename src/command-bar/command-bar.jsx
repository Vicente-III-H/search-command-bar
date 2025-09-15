import { useEffect, useState } from "react";
import { executeCommand, getSearchCommands } from "./execute";

function CommandBar({ setOutput, commandBarRef }) {
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
            executeCommand(cmdInput, setCmdInput, searchCommands, setSearchCommands, setOutput, setEnabled);
        }
    }

    return (
        <div id="command-bar" className="flexbox">
            <input
                type="text"
                className={"flex" + (enabled ? "" : " disabled")}
                value={cmdInput}
                onChange={(event) => setCmdInput(event.target.value)}
                onKeyDown={onKeyDown}
                ref={commandBarRef}
                placeholder="Enter commands here"
            />
        </div>
    )
}

export default CommandBar