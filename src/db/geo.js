require('dotenv').config()
const { convertJsonToAttributeMap } = require('../utils')
const getDynamoStations = require('../convertToDynamo')
const ddbGeo = require('dynamodb-geo');
const AWS = require('aws-sdk');
const parse = AWS.DynamoDB.Converter.unmarshall
const uuid = require('uuid');

const awsConfig = {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
}
AWS.config.update(awsConfig);

const convertToAttributeObject = item => ({
    RangeKeyValue: { S: uuid.v4() }, // Use this to ensure uniqueness of the hash/range pairs.
    GeoPoint: {
        latitude: item.latitude,
        longitude: item.longitude
    },
    PutItemInput: {
        Item: convertJsonToAttributeMap(item)
    }
})
const convertData = data => data.map(convertToAttributeObject)

const wait = (waitTime = 1000) => new Promise((res) => setInterval(res, waitTime))

class DynamoGeoManager {
    constructor() {
        this.ddb = new AWS.DynamoDB({ endpoint: 'http://localhost:8000' });
        this.config = new ddbGeo.GeoDataManagerConfiguration(this.ddb, 'Stations');
        // const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        
        this.stationsManager = new ddbGeo.GeoDataManager(this.config);
        // Use GeoTableUtil to help construct a CreateTableInput.
        this.createTableInput = ddbGeo.GeoTableUtil.getCreateTableRequest(this.config);
        this.createTableInput.ProvisionedThroughput.ReadCapacityUnits = 2;
        console.dir(this.createTableInput, { depth: null });

    }

    async batchWrite (allData) {
        const BATCH_SIZE = 25;
        const WAIT_BETWEEN_BATCHES_MS = 1000;
        let currentIndex = 0
    
        while (currentIndex < allData.length) {
            console.log(`Writing batch starting at index ${currentIndex} of ${allData.length}`)
            const newIndex = currentIndex + BATCH_SIZE
            const currentBatch = allData.slice(currentIndex, newIndex)
            // console.log({currentBatch: currentBatch.map(i => JSON.stringify(i.PutItemInput))})
            await this.stationsManager.batchWritePoints(currentBatch).promise()
            // await wait(WAIT_BETWEEN_BATCHES_MS)
            currentIndex = newIndex
            console.log({success: 1})
        }
        console.log({done: 1})
    }

    async loadData () {
        console.log('Loading sample data from allStations.json');
        const data = getDynamoStations()
        const putPointInputs = convertData(data)
        await this.batchWrite(putPointInputs)
    }

    async queryData () {
        console.log('Querying by radius, looking 20km from Chicago, IL.');
        const km = 20
        const radius = km * 1000 
        const dynamoResults = await this.stationsManager.queryRadius({
            RadiusInMeter: radius,
            CenterPoint: {
                latitude: 41.9229,
                longitude: -87.6483
            }
        })

        const parsedResults = dynamoResults.map(parse)
        console.dir(parsedResults)
    }

    async deleteTable () {
        await this.ddb.deleteTable({ TableName: this.config.tableName }).promise()
    }
    
    async createTable () {
        try {
            console.log({creatingTable: 1})
            await this.ddb.createTable(this.createTableInput).promise()
            await this.ddb.waitFor('tableExists', { TableName: this.config.tableName }).promise()
            console.log({successCreatingTable: 1})
        } catch (error) {
            console.log({error})
            await this.deleteTable()
        }
    }
}

const main = async () => {
    try {
        const manager = new DynamoGeoManager()
        await manager.createTable()
        await manager.loadData()
        await manager.queryData()
        await manager.deleteTable()

    } catch (error) {
        console.log({error})
        // console.warn({error})
    }
    
    process.exit(0)
}

main() 