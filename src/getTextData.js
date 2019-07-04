const fetch = require('node-fetch')
const fs = require('fs').promises
const path = require('path')

const URL_MAPPING = {
    stationZips:
        'https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/station-inventories/zipcodes-normals-stations.txt',
    allStations:
        'https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/station-inventories/allstations.txt',
    dailyAvgTemp:
        'https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/products/temperature/dly-tavg-normal.txt',
    dailyMaxTemp:
        'https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/products/temperature/dly-tmax-normal.txt',
    dailyMinTemp:
        'https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/products/temperature/dly-tmin-normal.txt',
    dailyPrecip50:
        'https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/products/precipitation/dly-prcp-50pctl.txt',
    dailyPrecip25:
        'https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/products/precipitation/dly-prcp-25pctl.txt',
    dailyPrecip75:
        'https://www1.ncdc.noaa.gov/pub/data/normals/1981-2010/products/precipitation/dly-prcp-75pctl.txt',
}

const getTextFile = async url => {
    const res = await fetch(url)
    const text = await res.text()
    return text
}

const processTextFile = async ([key, url]) => {
    console.log({ starting: key })
    try {
        const text = await getTextFile(url)
        const filePath = path.join('./txt', `${key}.txt`)
        await fs.writeFile(filePath, text)
        console.log({ gotTextFor: key })
    } catch (error) {
        console.log({ error })
    }
}

const processAllFiles = async mapping => {
    const entries = Object.entries(mapping)
    const processingFiles = entries.map(processTextFile)

    return await Promise.all(processingFiles)
}

const main = async () => {
    await processAllFiles(URL_MAPPING)
    console.log({ success: 2 })
}

module.exports = main
