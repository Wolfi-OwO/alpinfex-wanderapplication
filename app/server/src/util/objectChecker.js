/**
 * 
 * @param {object} obj1 
 * @param {object} obj2 
 * @param {Array} skipKeys 
 * @Definition Checks every key of an object and their values. Both objects need to have the same keys.
 * @returns true | false
 */
function checkPropertiesOfObjects(obj1, obj2, ...skipKeys) {
    for (const key in obj1) {
        if (skipKeys.includes(key)) continue;

        // Check if object has sub objects
        if (typeof obj1[key] === 'object') {
            return checkPropertiesOfObjects(obj1[key], obj2[key], ...skipKeys)
        }
        
        if (obj1[key] !== obj2[key] ) {
            return false;
        }
    }

    return true;
}

export default checkPropertiesOfObjects;