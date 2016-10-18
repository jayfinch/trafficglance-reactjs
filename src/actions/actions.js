import type from './constants'
import fetchJsonp from 'fetch-jsonp'
import * as commutesHelper from '../utils/commutes-helper'
import * as trafficHelper from '../utils/traffic-helper'

// fetchConfig

export function fetchConfig (uri = '/config.json') {
  return function (dispatch) {
    dispatch(fetchConfigRequest())

    return fetch(uri)
    .then((response) => response.json())
    .then((json) => dispatch(fetchConfigSuccess(json)))
    .catch((e) => dispatch(fetchConfigFailure(e.message)))
  }
}
export function fetchConfigRequest () {
  return {
    type: type.FETCH_CONFIG_REQUEST
  }
}

export function fetchConfigSuccess (data) {
  return {
    type: type.FETCH_CONFIG_SUCCESS,
    apiKey: data.apiKey,
    distanceUnit: data.distanceUnit,
    commutes: commutesHelper.transformCommutes(data.commutes)
  }
}

export function fetchConfigFailure (message) {
  return {
    type: type.FETCH_CONFIG_FAILURE,
    error: message
  }
}

// fetchTraffic

export function fetchTraffic (url, id) {
  return function (dispatch) {
    dispatch(fetchTrafficRequest(id))

    return fetchJsonp(url, {
      jsonpCallback: 'jsonp'
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.statusCode === 200) {
        dispatch(fetchTrafficSuccess(id, json))
      } else {
        throw new Error('Problem with Bing data')
      }
    })
    .catch((e) => dispatch(fetchTrafficFailure(id, e.message)))
  }
}

export function fetchTrafficRequest (id) {
  return {
    type: type.FETCH_TRAFFIC_REQUEST,
    id: id,
    isFetching: false
  }
}

export function fetchTrafficSuccess (id, bingData) {
  const subTree = trafficHelper.getSubTree(bingData)

  return {
    type: type.FETCH_TRAFFIC_SUCCESS,
    id: id,
    trafficData: {
      ...trafficHelper.getDurationTime(subTree),
      ...trafficHelper.getDurationByCongestion(subTree),
      distance: trafficHelper.getDistance(subTree),
      arriveTime: trafficHelper.getArriveTime(subTree)
    }
  }
}

export function fetchTrafficFailure (id, message) {
  return {
    type: type.FETCH_TRAFFIC_FAILURE,
    id: id,
    error: message
  }
}
