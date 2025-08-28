const isEmptyObject = (object) => {
    for (const prop in object) {
        if (Object.hasOwn(object, prop)) { return false }
    }
    return true;
}

const getStorage = async (key) => {
    try {
        const storage = await chrome.storage.local.get(key);
        console.log(isEmptyObject(storage));
    } catch (error) {
        console.log(error);
    }
}

export { getStorage }