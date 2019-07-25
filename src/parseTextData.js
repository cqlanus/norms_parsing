const fs = require('fs').promises
const path = require('path')
const r = require('ramda')
const { readFile } = require('./utils')
const SPLITS_MAPPING = require('../constants/splits')

const getPath = r.curry((ext, key) => `./${ext}/${key}.${ext}`)

const getPathToRead = getPath('txt')
const getPathToWrite = getPath('json')

const getValueFromRecord = (record, coords) =>
    record.substring(...coords).trim()

const objectifyValuesFromRecord = mapping => record => {
    const keys = Object.keys(mapping)

    const obj = keys.reduce((acc, key) => {
        const coords = mapping[key]
        const value = getValueFromRecord(record, coords)
        acc = { ...acc, [key]: value }
        return acc
    }, {})
    return obj
}

const splitTextFile = r.compose(
    // r.slice(0, 10),
    r.split('\n'),
)

const convertTextToJson = mapping => r.map(objectifyValuesFromRecord(mapping))

const objectifyValue = str => {
    const lastCharIndex = str.length - 1
    const flag = str.substring(lastCharIndex)
    const value = (+str.substring(0, lastCharIndex)) / 10
    const obj = {
        flag, value
    }
    return obj
}

const consumeAndProcessValues = ( { values, ...item }) => {
    const splitValues = values.split(/\s+/)
    const formattedValues = splitValues.map(objectifyValue)
    return { ...item, values: JSON.stringify(formattedValues) }
}

const complexConvert = mapping => {
    const simpleConvert = convertTextToJson(mapping)
    return r.compose(
        r.map(consumeAndProcessValues),
        r.map(objectifyValuesFromRecord(mapping)),
    )
}

const NOT_DAILY = ['allStations', 'stationZips']
const isNotDaily = key => r.includes(key, NOT_DAILY)

const processData = (mapping, key) => {
    const convert = isNotDaily(key)
        ? convertTextToJson(mapping)
        : complexConvert(mapping)
    return r.compose(
        convert,
        splitTextFile,
    )
}

const writeToDisk = async (data, writePath) => {
    await fs.writeFile(writePath, JSON.stringify(data))
}

const parseDataForTextFile = async ([key, mapping]) => {
    const readPath = getPathToRead(key)
    const text = await readFile(readPath)
    const processDataForMapping = processData(mapping, key)
    const data = processDataForMapping(text)
    console.log({ data })
    const writePath = getPathToWrite(key)
    await writeToDisk(data, writePath)
    return data
}

const parseDataForAllFiles = async () => {
    const entries = Object.entries(SPLITS_MAPPING)
    const processingEntries = entries.map(parseDataForTextFile)
    await Promise.all(processingEntries)
}

module.exports = parseDataForAllFiles