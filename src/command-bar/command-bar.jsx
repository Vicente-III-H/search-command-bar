import { useEffect, useState } from "react";

const isEmptyObject = (object) => {
    for (const prop in object) {
        if (Object.hasOwn(object, prop)) { return false }
    }
    return true;
}
const parseInput = (input) => input.trim().split(" ").filter((string) => string !== "");

function CommandBar() {
    const [cmdInput, setCmdInput] = useState("");
    const [commands, setCommands] = useState({});

    useEffect(() => {
        const getStorage = async (key) => {
            try {
                const storage = await chrome.storage.local.get(key);
                console.log(isEmptyObject(storage));
            } catch (error) {
                console.log(error);
            }
        }

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