const admin = require('firebase-admin')
const stationZips = require('../../json/stationZips.json')
const allStations = require('../../json/allStations.json')
const dailyMaxTemps = require('../../json/dailyMaxTemp.json')
const dailyMinTemps = require('../../json/dailyMinTemp.json')
const dailyAvgTemps = require('../../json/dailyAvgTemp.json')

const firstRecord = stationZips[0]

let serviceAccount = require('./key.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const COLLECTION_MAP = {
    // zips: stationZips, /* DONE */
    // stations: allStations, /* DONE */
    dailyMaxTemp: dailyMaxTemps,
    // dailyMinTemp: dailyMinTemps,
    // dailyAvgTemp: dailyAvgTemps,
}

const COLLECTION_KEYS = {
    ZIPS: 'zips',
    STATIONS: 'stations',
    DAILY_MAX_TEMP: 'dailyMaxTemp',
}

const ID_KEYS = {
    ZIPS: 'zip',
    STATIONS: 'id',
    DAILY_MAX_TEMP: item => `${item.stationId}_${item.month}`,
    DEFAULT: 'id',
}

const stationFormatter = station => {
    const { latitude, longitude, ...restOfStation } = station
    return {
        ...restOfStation,
        position: new admin.firestore.GeoPoint(+latitude, +longitude),
    }
}

const dailyFormatter = dailyItem => {
    const { values, ...restOfDailyItem } = dailyItem
    return {
        ...restOfDailyItem,
        values: JSON.parse(values),
    }
}

const formatItem = (idFormatter, itemFormatter) => item => {
    const id =
        typeof idFormatter === 'function' ? idFormatter(item) : idFormatter
    const finalItem = itemFormatter ? itemFormatter(item) : item
    return { id, ...finalItem }
}

const formatItems = collectionKey => items => {
    switch (collectionKey) {
        case COLLECTION_KEYS.ZIPS: {
            const formatZip = formatItem(ID_KEYS.ZIPS)
            return items.map(formatZip)
        }
        case COLLECTION_KEYS.STATIONS: {
            const formatStation = formatItem(ID_KEYS.STATIONS, stationFormatter)
            return items.map(formatStation)
        }
        case COLLECTION_KEYS.DAILY_MAX_TEMP: {
            const formatDailyMaxTemp = formatItem(
                ID_KEYS.DAILY_MAX_TEMP,
                dailyFormatter,
            )
            return items.map(formatDailyMaxTemp)
        }
        default: {
            const formatDefault = formatItem(ID_KEYS.DEFAULT)
            return items.map(formatDefault)
        }
    }
}

const postItem = collectionKey => async item => {
    try {
        const itemCollection = db.collection(collectionKey)
        await itemCollection.doc(item.id).set(item)
    } catch (error) {
        console.log({ error })
    }
}

const postAllItems = async (items, collectionKey) => {
    const formatItemsForCollection = formatItems(collectionKey)
    const formattedItems = formatItemsForCollection(items)
    const processingItems = formattedItems.map(postItem(collectionKey))
    await Promise.all(processingItems)
    console.log({ postedCollection: collectionKey })
}

const setData = async () => {
    const processingCollections = Object.entries(COLLECTION_MAP).map(
        ([key, items]) => postAllItems(items, key),
    )
    await Promise.all(processingCollections)
    console.log({ success: 1 })
}

setData()
