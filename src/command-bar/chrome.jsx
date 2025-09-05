const isEmptyObject = (object) => {
    for (const prop in object) {
        if (Object.hasOwn(object, prop)) { return false }
    }
    return true;
}

const getSearchCmds = async (defaultSearchCmds) => {
    try {
        let cmds = await chrome.storage.local.get("search-commands");
        if (isEmptyObject(cmds)) {
            await chrome.storage.local.set({"search-commands": defaultSearchCmds});
            cmds = {"search-commands": defaultSearchCmds};
        }
        return cmds;
    } catch (error) {
        console.log("Failed to retrieve stored commands: ", error);
        return {"search-commands": defaultSearchCmds};
    }
}

const addSearchCmd = async (newCmd, alias, urlPieces) => {
    const cmdProps = {
        "alias": alias,
        "urlPieces": urlPieces
    };

    try {
        const currCmds = await chrome.storage.local.get("search-commands");
        let newCurrCmds = currCmds["search-commands"];
        newCurrCmds[newCmd] = cmdProps;
        await chrome.storage.local.set({"search-commands": newCurrCmds});
    } catch (error) {
        throw new Error(error);
    }
}

const deleteSearchCmd = async (deleteCmd) => {
    try {
        const currCmds = await chrome.storage.local.get("search-commands");
        let newCurrCmds = currCmds["search-commands"];
        delete newCurrCmds[deleteCmd];
        await chrome.storage.local.set({"search-commands": newCurrCmds});
    } catch (error) {
        throw new Error(error);
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
    addSearchCmd,
    deleteSearchCmd,
    changeTabURL,
    clearStorage,
}