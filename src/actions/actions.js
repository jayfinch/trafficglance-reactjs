import type from './constants'
import fetchJsonp from 'fetch-jsonp'
import { transformCommutes } from '../utils/commutes-helper'
import { transformTraffic } from '../utils/traffic-helper'

// fetch config

export function fetchConfig () {
  return function (dispatch) {
    dispatch(fetchConfigRequest())

    return fetch('/config.json')
    .then((response) => response.json())
    .then((json) => dispatch(fetchConfigSuccess(json)))
    .catch((e) => dispatch(fetchConfigFailure(e)))
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
    commutes: transformCommutes(data.commutes)
  }
}

export function fetchConfigFailure (error) {
  return {
    type: type.FETCH_CONFIG_FAILURE,
    error: error.message
  }
}

// fetch traffic

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
    .catch((e) => dispatch(fetchTrafficFailure(id, e)))
  }
}

export function fetchTrafficRequest (id) {
  return {
    type: type.FETCH_TRAFFIC_REQUEST,
    id: id,
    isFetching: false
  }
}

export function fetchTrafficSuccess (id, trafficData) {
  return {
    type: type.FETCH_TRAFFIC_SUCCESS,
    id: id,
    trafficData: transformTraffic(trafficData)
  }
}

export function fetchTrafficFailure (id, error) {
  return {
    type: type.FETCH_TRAFFIC_FAILURE,
    id: id,
    error: error.message
  }
}
