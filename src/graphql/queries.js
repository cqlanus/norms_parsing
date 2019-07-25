// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
export const getStation = `query GetStation($id: ID!) {
  getStation(id: $id) {
    id
    stationId
    latitude
    longitude
    elevation
    state
    name
    gsnFlag
    hcnFlag
    wmoId
    metohd
    zip {
      id
      station {
        id
        stationId
        latitude
        longitude
        elevation
        state
        name
        gsnFlag
        hcnFlag
        wmoId
        metohd
      }
      zip
      city
    }
    dailyMaxTemp {
      items {
        id
        month
      }
      nextToken
    }
  }
}
`;
export const listStations = `query ListStations(
  $filter: ModelStationFilterInput
  $limit: Int
  $nextToken: String
) {
  listStations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      stationId
      latitude
      longitude
      elevation
      state
      name
      gsnFlag
      hcnFlag
      wmoId
      metohd
      zip {
        id
        zip
        city
      }
      dailyMaxTemp {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getZip = `query GetZip($id: ID!) {
  getZip(id: $id) {
    id
    station {
      id
      stationId
      latitude
      longitude
      elevation
      state
      name
      gsnFlag
      hcnFlag
      wmoId
      metohd
      zip {
        id
        zip
        city
      }
      dailyMaxTemp {
        nextToken
      }
    }
    zip
    city
  }
}
`;
export const listZips = `query ListZips($filter: ModelZipFilterInput, $limit: Int, $nextToken: String) {
  listZips(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      station {
        id
        stationId
        latitude
        longitude
        elevation
        state
        name
        gsnFlag
        hcnFlag
        wmoId
        metohd
      }
      zip
      city
    }
    nextToken
  }
}
`;
export const getDailyMaxTemp = `query GetDailyMaxTemp($id: ID!) {
  getDailyMaxTemp(id: $id) {
    id
    station {
      id
      stationId
      latitude
      longitude
      elevation
      state
      name
      gsnFlag
      hcnFlag
      wmoId
      metohd
      zip {
        id
        zip
        city
      }
      dailyMaxTemp {
        nextToken
      }
    }
    month
    values {
      flag
      value
    }
  }
}
`;
export const listDailyMaxTemps = `query ListDailyMaxTemps(
  $filter: ModelDailyMaxTempFilterInput
  $limit: Int
  $nextToken: String
) {
  listDailyMaxTemps(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      station {
        id
        stationId
        latitude
        longitude
        elevation
        state
        name
        gsnFlag
        hcnFlag
        wmoId
        metohd
      }
      month
      values {
        flag
        value
      }
    }
    nextToken
  }
}
`;
