const getTextData = require('./getTextData')
const parseDataForAllFiles = require('./parseTextData')

const main = async () => {
    await getTextData()
    await parseDataForAllFiles()
}

main()
