const getTextData = require('./src/getTextData')
const parseDataForAllFiles = require('./src/parseTextData')

const main = async () => {
    await getTextData()
    await parseDataForAllFiles()
}

main()
