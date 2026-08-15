function tryParsingIntegers(possibleInteger){
    return new Promise((resolve, reject) => {
        try {
            const number = parseInt(possibleInteger)
            resolve(number);
        } catch (err) {
            reject(err);
        }   
    });
}
function tryParsingFloats(possibleFloat){
    return new Promise((resolve, reject) => {
        try {
            const number = parseFloat(possibleFloat)
            resolve(number);
        } catch (err) {
            reject(err);
        }   
    });
}

export {tryParsingIntegers, tryParsingFloats}
