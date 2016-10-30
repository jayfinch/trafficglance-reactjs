import { type } from '../constants/constants'

const initialState = {
  apiKey: 'no-key-defined',
  distanceUnit: 'mi',
  commutes: []
}

export default function (state = initialState, action) {
  switch (action.type) {

    case type.FETCH_CONFIG_SUCCESS:
      return {
        ...state,
        apiKey: action.apiKey,
        distanceUnit: action.distanceUnit,
        commutes: action.commutes
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
            trafficData: action.trafficData,
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
