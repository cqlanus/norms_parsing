// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateTodo = `subscription OnCreateTodo {
  onCreateTodo {
    id
    name
    description
  }
}
`;
export const onUpdateTodo = `subscription OnUpdateTodo {
  onUpdateTodo {
    id
    name
    description
  }
}
`;
export const onDeleteTodo = `subscription OnDeleteTodo {
  onDeleteTodo {
    id
    name
    description
  }
}
`;
export const onCreateStation = `subscription OnCreateStation {
  onCreateStation {
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
export const onUpdateStation = `subscription OnUpdateStation {
  onUpdateStation {
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
export const onDeleteStation = `subscription OnDeleteStation {
  onDeleteStation {
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
export const onCreateZip = `subscription OnCreateZip {
  onCreateZip {
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
export const onUpdateZip = `subscription OnUpdateZip {
  onUpdateZip {
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
export const onDeleteZip = `subscription OnDeleteZip {
  onDeleteZip {
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
export const onCreateDailyMaxTemp = `subscription OnCreateDailyMaxTemp {
  onCreateDailyMaxTemp {
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
export const onUpdateDailyMaxTemp = `subscription OnUpdateDailyMaxTemp {
  onUpdateDailyMaxTemp {
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
export const onDeleteDailyMaxTemp = `subscription OnDeleteDailyMaxTemp {
  onDeleteDailyMaxTemp {
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
