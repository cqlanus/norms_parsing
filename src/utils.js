const fs = require('fs')

const readFile = path =>
    new Promise((resolve, reject) => {
        const cb = (err, res) => {
            if (err) {
                reject(err)
            }
            if (res) {
                resolve(res)
            }
        }
        fs.readFile(path, 'utf8', cb)
    })

const asyncMap = (array, cb) =>
    array.reduce((p, v) => p.then(() => cb(v)), Promise.resolve())

const getAttributeMap = value => {
    if (typeof value === 'string') {
        return { S: value }
    } else if (typeof value === 'number') {
        return { N: `${value}` }
    } else if (Array.isArray(value)) {
        return { L: value.map(convertJsonToAttributeMap) }
    } else if (typeof value === 'object') {
        return { M: convertJsonToAttributeMap(value) }
    }
}
    
const convertJsonToAttributeMap = json => {
    const entries = Object.entries(json)
    const attributeMaps = entries.reduce((acc, entry) => {
        const [ key, value ] = entry
        if (value === "") { return acc }
        const attributeMap = getAttributeMap(value)
        return attributeMap 
        ? {
            ...acc,
            [key]: attributeMap
        }
        : acc
    }, {})
    return attributeMaps
}

module.exports = {
    readFile,
    asyncMap,
    convertJsonToAttributeMap
}
