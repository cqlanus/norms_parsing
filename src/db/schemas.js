const createSchema = (tableName) => ({
    TableName: tableName,
    AttributeDefinitions: [
        {
            AttributeName: "id",
            AttributeType: "S",
        },
    ],
    KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH'
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    StreamSpecification: {
        StreamEnabled: false
    }
})

module.exports = createSchema