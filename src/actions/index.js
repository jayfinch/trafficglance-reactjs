import type from './constants'
import fetchJsonp from 'fetch-jsonp'

export function requestConfig () {
  return {
    type: type.REQUEST_CONFIG
  }
}

export function receiveConfig (data) {
  return {
    type: type.RECEIVE_CONFIG,
    data: data
  }
}

export function failConfig (error) {
  return {
    type: type.FAIL_CONFIG,
    error: error
  }
}

export function requestTraffic (id) {
  return {
    type: type.REQUEST_TRAFFIC,
    id: id,
    isFetching: false
  }
}

export function receiveTraffic (id, trafficData) {
  return {
    type: type.RECEIVE_TRAFFIC,
    id: id,
    trafficData: trafficData
  }
}

export function failTraffic (id, error) {
  return {
    type: type.FAIL_TRAFFIC,
    id: id,
    error: error
  }
}

// async

export function fetchConfig () {
  return function (dispatch) {
    dispatch(requestConfig())

    return fetch('/config.json')
    .then((response) => response.json())
    .then((json) => dispatch(receiveConfig(json)))
    .catch((e) => dispatch(failConfig(e)))
  }
}

export function fetchTraffic (url, id) {
  return function (dispatch) {
    dispatch(requestTraffic(id))

    return fetchJsonp(url, {
      jsonpCallback: 'jsonp'
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.statusCode === 200) {
        dispatch(receiveTraffic(id, json))
      } else {
        throw new Error('Problem with Bing data')
      }
    })
    .catch((e) => dispatch(failTraffic(id, e)))
  }
}
