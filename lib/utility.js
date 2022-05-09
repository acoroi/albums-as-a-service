/* Module for utility functions that may have use in more than one place. */

const generateId = () => {
    // Get current time elapsed since Jan 1970 in ms
    const str = Date.now().toString();

    // Pull last 6 from it and return as unique identifier
    return str.substring(str.length - 6);
};

module.exports = {
    generateId,
};
