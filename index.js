const fetch = require('node-fetch')
const fs = require('fs')

const url =
    'https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/station-inventories/allstations.txt'

const successCb = () => console.log({ success: 1 })

const getTextFile = async url => {
    const res = await fetch(url)
    const text = await res.text()
    return text
}

const writeToDisk = async text => {
    await fs.writeFile('./allStations.txt', text, successCb)
}

const main = async () => {
    try {
        const text = await getTextFile(url)
        await writeToDisk(text)
        console.log({ success: 1 })
    } catch (error) {
        console.log({ error })
    }
}

main()
