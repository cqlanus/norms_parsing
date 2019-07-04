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

module.exports = {
    readFile,
    asyncMap,
}
