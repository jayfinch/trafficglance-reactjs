import type from '../actions/constants'
import transformCommutes from '../utils/transform-commutes'
import transformTraffic from '../utils/transform-traffic'

const initialState = {
  apiKey: 'no-key-defined',
  distanceUnit: 'mi',
  commutes: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case type.RECEIVE_CONFIG:
      var data = action.data
      data.commutes = transformCommutes(action.data.commutes)
      return Object.assign({}, state, data)

    case type.REQUEST_TRAFFIC:
      return Object.assign({}, state, {
        commutes: state.commutes.map(commute =>
          commute.id === action.id
          ? Object.assign({}, commute, {
            trafficData: null,
            fetchingTraffic: true
          })
          : commute
        )
      })

    case type.RECEIVE_TRAFFIC:
      return Object.assign({}, state, {
        commutes: state.commutes.map(commute =>
          commute.id === action.id ? Object.assign({}, commute, { trafficData: transformTraffic(action.trafficData), fetchingTraffic: false }) : commute
        )
      })

    default:
      return state
  }
}
