const fs = require('fs')
const path = require('path')

const stationsPath = path.join('.', 'allStations.txt')

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
        fs.readFile(path, cb)
    })

const getTextFile = async path => {
    const text = await readFile(path)
    console.log({ text })
    return text
}

getTextFile(stationsPath)
