import type from '../actions/constants'
import { transformCommutes, transformTraffic } from '../utils/bing-helper'

const initialState = {
  apiKey: 'no-key-defined',
  distanceUnit: 'mi',
  commutes: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case type.FETCH_CONFIG_SUCCESS:
      var data = action.data
      data.commutes = transformCommutes(action.data.commutes)
      return {
        ...state,
        ...data
      }

    case type.FETCH_CONFIG_FAILURE:
      return {
        ...state,
        configError: true
      }

    case type.FETCH_TRAFFIC_REQUEST:
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

    case type.FETCH_TRAFFIC_SUCCESS:
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

    case type.FETCH_TRAFFIC_FAILURE:
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
