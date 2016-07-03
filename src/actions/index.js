import type from './constants'
import _ from 'lodash'
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

export function fetchConfig () {
  return function (dispatch) {
    dispatch(requestConfig())

    return fetch('/config.json')
    .then((response) => response.json())
    .then((json) => dispatch(receiveConfig(json)))
    .catch((ex) => console.log('fetchConfig failed', ex))
  }
}

export function fetchTraffic (id, distanceUnit, apiKey, segments) {
  return function (dispatch) {
    dispatch(requestTraffic(id))

    let url = 'http://dev.virtualearth.net/REST/V1/Routes/Driving?&'
    url += 'distanceUnit=' + distanceUnit + '&'

    _.each(segments, function (segment, i) {
      url += segment.waypointType + '.' + i + '=' +
      segment.latitude + ',' +
      segment.longitude + '&'
    })

    url += 'key=' + apiKey

    return fetchJsonp(url, {
      jsonpCallback: 'jsonp'
    })
    .then((response) => response.json())
    .then((json) => dispatch(receiveTraffic(id, json)))
    .catch((ex) => console.log('fetchJsonp failed', ex))
  }
}
