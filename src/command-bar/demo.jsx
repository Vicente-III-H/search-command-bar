const isEmptyObject = (object) => {
    for (const prop in object) {
        if (Object.hasOwn(object, prop)) { return false }
    }
    return true;
}

const getCmdsFromLocalStorage = (item) => {
    const cmds = localStorage.getItem(item);
    if (!cmds) { return {} }
    return JSON.parse(cmds);
}

const setCmdInLocalStorage = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item));
}

const getSearchCmds = async (defaultSearchCmds) => {
    try {
        let cmds = getCmdsFromLocalStorage("search-commands");
        if (isEmptyObject(cmds)) {
            localStorage.setItem("search-commands", JSON.stringify({"search-commands": defaultSearchCmds}));
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
        const currCmds = getCmdsFromLocalStorage("search-commands");
        let newCurrCmds = currCmds["search-commands"];
        newCurrCmds[newCmd] = cmdProps;
        setCmdInLocalStorage("search-commands", {"search-commands": newCurrCmds});
    } catch (error) {
        throw new Error(error);
    }
}

const deleteSearchCmd = async (deleteCmd) => {
    try {
        const currCmds = getCmdsFromLocalStorage("search-commands");
        let newCurrCmds = currCmds["search-commands"];
        delete newCurrCmds[deleteCmd];
        setCmdInLocalStorage("search-commands", {"search-commands": newCurrCmds});
    } catch (error) {
        throw new Error(error);
    }
}

const clearStorage = async () => {
    try {
        localStorage.clear();
    } catch (error) {
        throw new Error(error);
    }
}

const changeTabURL = async (urlString) => {
    const link = encodeURI(urlString);
    try {
        window.location.assign(link);
    } catch (error) {
        throw new Error(error);
    }
}

export {
    getSearchCmds,
    addSearchCmd,
    deleteSearchCmd,
    changeTabURL,
    clearStorage,
}