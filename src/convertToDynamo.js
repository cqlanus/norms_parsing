const dailyMaxTemps = require('../json/dailyMaxTemp.json')
const zips = require('../json/stationZips.json')
const allStations = require('../json/allStations.json')
const { convertJsonToAttributeMap }= require('./utils')

const start = 0
const end = -1

const normalizeDailyValues = dailyValues => {
    return dailyValues.reduce((acc, val) => {
        const { id, month, values } = val
		if (acc[id]) {
			acc[id] = { ...acc[id], [`${month}`]: values }
		} else {
			acc[id] = { [`${month}`]: values }
        }
		return acc
	}, {})
}
const normalizeZipValues = zipValues => {
    return zipValues.reduce((acc, val) => {
        const { id } = val
        acc[id] = val
		// if (acc[id]) {
		// 	acc[id] = [ ...acc[id], val ]
		// } else {
        //     acc[id] = [ val ]
        // }

		return acc
	}, {})
}

const allMaxTemps = normalizeDailyValues(dailyMaxTemps.slice(start, end))
const allZips = normalizeZipValues(zips.slice(start, end))

const constructStation = station => {
    const { id } = station
    const zip = allZips[id]
	const dailyMaxTemps = allMaxTemps[id] || []
	const dynamoStation = {
		...station,
		zip,
		dailyMaxTemps
    }
    
    return dynamoStation
}

const constructDynamoStationValues = stations => {
    return stations.map(constructStation)
}

const getDynamoStations = () => {
    const stations = constructDynamoStationValues(allStations.slice(start, end))
	// console.log(stations.map(convertJsonToAttributeMap))
	return stations
}

module.exports = getDynamoStations