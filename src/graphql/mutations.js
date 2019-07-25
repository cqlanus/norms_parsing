// eslint-disable
// this is an auto generated file. This will be overwritten

export const createTodo = `mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const updateTodo = `mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const deleteTodo = `mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const createStation = `mutation CreateStation($input: CreateStationInput!) {
  createStation(input: $input) {
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
export const updateStation = `mutation UpdateStation($input: UpdateStationInput!) {
  updateStation(input: $input) {
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
export const deleteStation = `mutation DeleteStation($input: DeleteStationInput!) {
  deleteStation(input: $input) {
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
export const createZip = `mutation CreateZip($input: CreateZipInput!) {
  createZip(input: $input) {
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
export const updateZip = `mutation UpdateZip($input: UpdateZipInput!) {
  updateZip(input: $input) {
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
export const deleteZip = `mutation DeleteZip($input: DeleteZipInput!) {
  deleteZip(input: $input) {
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
export const createDailyMaxTemp = `mutation CreateDailyMaxTemp($input: CreateDailyMaxTempInput!) {
  createDailyMaxTemp(input: $input) {
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
export const updateDailyMaxTemp = `mutation UpdateDailyMaxTemp($input: UpdateDailyMaxTempInput!) {
  updateDailyMaxTemp(input: $input) {
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
export const deleteDailyMaxTemp = `mutation DeleteDailyMaxTemp($input: DeleteDailyMaxTempInput!) {
  deleteDailyMaxTemp(input: $input) {
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
