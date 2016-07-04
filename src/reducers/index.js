import type from '../actions/constants'
import { transformCommutes, transformTraffic } from '../utils/bing'

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
      return {
        ...state,
        ...data
      }

    case type.FAIL_CONFIG:
      return {
        ...state,
        configError: true
      }

    case type.REQUEST_TRAFFIC:
      return {
        ...state,
        commutes: state.commutes.map(commute =>
          commute.id === action.id ? {
            ...commute,
            trafficData: null,
            fetchingTraffic: true,
            trafficError: false
          }
          : commute
        )
      }

    case type.RECEIVE_TRAFFIC:
      return {
        ...state,
        commutes: state.commutes.map(commute =>
          commute.id === action.id ? {
            ...commute,
            trafficData: transformTraffic(action.trafficData),
            fetchingTraffic: false,
            trafficError: false
          }
          : commute
        )
      }

    case type.FAIL_TRAFFIC:
      return {
        ...state,
        commutes: state.commutes.map(commute =>
          commute.id === action.id ? {
            ...commute,
            trafficData: null,
            fetchingTraffic: false,
            trafficError: true
          }
          : commute
        )
      }

    default:
      return state
  }
}
