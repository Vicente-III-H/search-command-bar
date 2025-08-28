import { useEffect, useState } from "react";
import { getStorage } from "./chrome";

const parseInput = (input) => input.trim().split(" ").filter((string) => string !== "");

function CommandBar() {
    const [cmdInput, setCmdInput] = useState("");
    const [commands, setCommands] = useState({});

    useEffect(() => {
        getStorage("commands");
    }, [])

    return (
        <div id="command-bar">
            <input
                type="text"
                value={cmdInput}
                onChange={(event) => setCmdInput(event.target.value)}
            />
            <button>Search</button>
        </div>
    )
}

export default CommandBar