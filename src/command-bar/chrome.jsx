const DEFAULT_SEARCH_CMDS = {
    "g": ["https://www.google.com/search?q="],
    "y": ["https://youtube.com/results?search_query="],
}

const isEmptyObject = (object) => {
    for (const prop in object) {
        if (Object.hasOwn(object, prop)) { return false }
    }
    return true;
}

const getSearchCmds = async () => {
    try {
        let cmds = await chrome.storage.local.get("search-commands");
        if (isEmptyObject(cmds)) {
            await chrome.storage.local.set({"search-commands": DEFAULT_SEARCH_CMDS});
            cmds = DEFAULT_SEARCH_CMDS;
        }
        return cmds;
    } catch (error) {
        console.log("Failed to retrieve stored commands: ", error);
        return DEFAULT_SEARCH_CMDS;
    }
}

const clearStorage = async () => {
    try {
        await chrome.storage.local.clear();
    } catch (error) {
        console.log("Failed to clear storage: ", error);
    }
}

const changeTabURL = async (urlString) => {
    const link = encodeURI(urlString);
    try {
        await chrome.tabs.update(undefined, {"url": link});
    } catch (error) {
        console.log("Failed to open URL: ", error);
    }
}

export {
    getSearchCmds,
    changeTabURL,
    clearStorage,
}