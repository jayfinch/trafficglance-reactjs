import type from './constants'

export function bootstrap () {
  return {
    type: type.BOOTSTRAP
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

export function fetchTraffic (id) {
  return function (dispatch) {
    dispatch(requestTraffic(id))

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    }).then(() => {
      dispatch(receiveTraffic(id, {
        travelDurationStats: true,
        arriveTime: '1:30 PM',
        distance: '23.7',
        minutes: 33,
        fetchingTraffic: false
      }))
    })
  }
}
