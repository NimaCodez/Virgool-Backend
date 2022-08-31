const { genSaltSync, hashSync, compareSync } = require("bcrypt");

function HashString(data) {
    const salt = genSaltSync(11);
    return hashSync(data, salt)
}

function CompareDataWithHash(RawData, hashString) {
    return !!compareSync(RawData, hashString);
}

function GenerateRandomNumber () {
    return Math.floor((Math.random() * 900000) + 100000)
}

module.exports = {
    HashString,
    CompareDataWithHash,
    GenerateRandomNumber
}
