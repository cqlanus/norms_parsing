const ZIP_SPLITS = {
    id: [0, 11],
    zip: [12, 17],
    city: [17],
}
/* 
    ------------------------------
    Variable   Columns   Type
    ------------------------------
    ID            1-11   Character
    LATITUDE     13-20   Real
    LONGITUDE    22-30   Real
    ELEVATION    32-37   Real
    STATE        39-40   Character
    NAME         42-71   Character
    GSNFLAG      73-75   Character
    HCNFLAG      77-79   Character
    WMOID        81-85   Character
    METHOD*	    87-99   Character
    ------------------------------
*/
const STATION_SPLITS = {
    id: [0, 11],
    latitude: [12, 20],
    longitude: [21, 30],
    elevation: [31, 37],
    state: [38, 40],
    name: [41, 71],
    gsnFlag: [72, 75],
    hcnFlag: [76, 79],
    wmoId: [80, 85],
    method: [86, 99],
}

const DAILY_MAPPING = {
    id: [0, 11],
    month: [12, 14],
    values: [18],
}


const SPLITS_MAPPING = {
    allStations: STATION_SPLITS,
    stationZips: ZIP_SPLITS,
    dailyMaxTemp: DAILY_MAPPING,
    dailyMinTemp: DAILY_MAPPING,
    dailyAvgTemp: DAILY_MAPPING,
    dailyPrecip25: DAILY_MAPPING,
    dailyPrecip50: DAILY_MAPPING,
    dailyPrecip75: DAILY_MAPPING,
}

module.exports = SPLITS_MAPPING
