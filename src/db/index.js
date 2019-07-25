const AWS = require("aws-sdk")
const createSchema = require('./schemas')
const stationZips = require('../../json/stationZips.json')
const allStations = require('../../json/allStations.json')
const dailyMaxTemp = require('../../json/dailyMaxTemp.json')

AWS.config.update({ region: "us-east-1" })

const nodeResolver = (resolve, reject) => (err, data) => {
    if (err) {
        reject(err)
    } else {
        resolve(data)
    }
}

const convertArray = array => {
    return {
        L: array.map(i => ({ M: convertJsonToDynamoItem(i) }))
    }
}

const convertJsonToDynamoItem = json => {
    const entries = Object.entries(json)
    return entries.reduce((acc, entry) => {
        let [ key, value ] = entry

        if (value === "") { return acc }
        
        const valueObj = typeof value === 'string' 
            ? { S: value } 
            : Array.isArray(value)
            ? convertArray(value)
            : { N: value }
        acc[key] = valueObj
        return acc
    }, {})
}

const convertDailyValues = daily => ({
    ...daily,
    id: `${daily.id}_${daily.month}`,
    stationId: daily.id,
})

const convertZipValues = zip => ({
    ...zip,
    id: `${zip.id}_${zip.zip}`,
    stationId: zip.id
})

const createDynamoItem = TableName => json => ({
    TableName,
    Item: convertJsonToDynamoItem(json)
})

const createDynamoBatchItem = json => ({
    PutRequest: {
        Item: convertJsonToDynamoItem(json)
    }
})

const createDynamoBatchItems = TableName => items => {
    return {
        RequestItems: {
            [TableName]: items.map(createDynamoBatchItem)
        }
    }
}

const promisify = fn => (...args) => new Promise((res, rej) => fn(...args, nodeResolver(res, rej)))

class DynamoManager {
    constructor() {
        const ddb = new AWS.DynamoDB({ apiVersion: "latest" })
        this.db = ddb
    }

    _createTable(table) {
        return new Promise((res, rej) => this.db.createTable(table, nodeResolver(res, rej)))
    }
    
    _listTables() {
        return new Promise((resolve, reject) => {
            this.db.listTables({ Limit: 10 }, nodeResolver(resolve, reject))
        })
    }

    _describeTable(name) {
        return new Promise((resolve, reject) => {
            this.db.describeTable({ TableName: name }, nodeResolver(resolve, reject))
        })
    }

    _putItem(params) {
        return new Promise((res, rej) => {
            this.db.putItem(params, nodeResolver(res, rej))
        })
    }

    _batchWrite(items) {
        return new Promise((res, rej) => {
            this.db.batchWriteItem(items, nodeResolver(res, rej))
        })
    }

    _getItem(params) {
        return new Promise((res, rej) => {
            this.db.getItem(params, nodeResolver(res, rej))
        })
    }

    _deleteTable(name) {
        return new Promise((res, rej) => this.db.deleteTable({ TableName: name }, nodeResolver(res, rej)))
    }

    async createTable(table) {
        return await this._createTable(table)
    }

    async listTables(tableName) {
        const { TableNames } = await this._listTables()
        return TableNames
    }

    async putItem(params) {
        const result = await this._putItem(params)
        return result
    }

    async deleteAllTables() {
        const { TableNames } = await this._listTables()

        const processingDeletes = TableNames.map(name => {
            try {
                return this._deleteTable(name)
            } catch (error) {
                console.log({error})
            }
        })

        Promise.all(processingDeletes)
            .then(stuff => console.log({stuff}))
    }

    async batchWrite(table, items) {
        let startIndex = 0
        const length = items.length
        const increment = 25
        while (startIndex < length) {
            try {
                let newIndex = startIndex + increment
                const batchItems = createDynamoBatchItems(table)(items.slice(startIndex, newIndex))
                console.log({batchItems})
                await this._batchWrite(batchItems)
                startIndex = newIndex
            } catch (error) {
                console.log({error})
            }
        }
        
        console.log({done: 1})
    }
}

const manager = new DynamoManager()

const main = async () => {

    try {
        const stuff = await manager.batchWrite('Zip', stationZips.map(convertZipValues))
        
    } catch (error) {
        console.log({error: error.errors})
    }

    // const testZip = {
    //     id: 'testing1234',
    //     zip: '60525',
    //     stationId: 'USC00111550'
    // }

    // const dynamoItem = convertJsonToDynamoItem(testZip)
    // const params = createDynamoItem('Zip')(dynamoItem)
    // const thing = await manager.putItem(params)
    // console.log({thing})

}

main()
