import { useState } from "react";

const parseInput = (input) => input.trim().split(" ").filter((string) => string !== "");

function CommandBar() {
    const [cmdInput, setCmdInput] = useState("");

    return (
        <div id="command-bar">
            <input
                type="text"
                value={cmdInput}
                onChange={(event) => setCmdInput(event.target.value)}
            />
            <button></button>
        </div>
    )
}

export default CommandBar