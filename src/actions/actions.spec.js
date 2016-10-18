import * as actions from './actions'
import * as trafficHelper from './../utils/traffic-helper'
import * as commutesHelper from './../utils/commutes-helper'
import sinon from 'sinon'
import type from './constants'

describe('actions', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  // fetchConfig

  describe('fetchConfigRequest', () => {
    it('Should return expected properties', () => {
      const actual = actions.fetchConfigRequest()
      const expected = {
        type: type.FETCH_CONFIG_REQUEST
      }
      expect(actual).to.deep.equal(expected)
    })
  })

  describe('fetchConfigSuccess', () => {
    it('Should return expected properties', () => {
      sandbox.stub(commutesHelper, 'transformCommutes', () => 'bar-transformed')

      const commute = 'baz'
      const data = {
        apiKey: 'foo',
        distanceUnit: 'bar',
        commutes: commute
      }

      const expected = {
        type: type.FETCH_CONFIG_SUCCESS,
        apiKey: 'foo',
        distanceUnit: 'bar',
        commutes: 'bar-transformed'
      }

      const actual = actions.fetchConfigSuccess(data)

      expect(actual).to.deep.equal(expected)
      expect(commutesHelper.transformCommutes.calledWith(commute)).to.be.true
    })
  })

  describe('fetchConfigFailure', () => {
    it('Should return expected properties', () => {
      const actual = actions.fetchConfigFailure('foo')
      const expected = {
        type: type.FETCH_CONFIG_FAILURE,
        error: 'foo'
      }
      expect(actual).to.deep.equal(expected)
    })
  })

  // fetchTraffic

  describe('fetchTrafficRequest', () => {
    it('Should return expected properties', () => {
      const actual = actions.fetchTrafficRequest('foo', 'bar')
      const expected = {
        type: type.FETCH_TRAFFIC_REQUEST,
        id: 'foo',
        isFetching: false
      }
      expect(actual).to.deep.equal(expected)
    })
  })

  describe('fetchTrafficSuccess', () => {
    it('Should return expected properties', () => {
      const bingData = {}
      sandbox.stub(trafficHelper, 'getSubTree')
      sandbox.stub(trafficHelper, 'getDistance', () => 'a')
      sandbox.stub(trafficHelper, 'getArriveTime', () => 'b')
      sandbox.stub(trafficHelper, 'getDurationTime', () => {
        return {
          hours: 'c',
          minutes: 'd'
        }
      })
      sandbox.stub(trafficHelper, 'getDurationByCongestion', () => {
        return {
          durationNoCongestion: 'e',
          durationLowCongestion: 'f',
          durationModerateCongestion: 'g',
          durationSeriousCongestion: 'h',
          travelWarnings: 'i'
        }
      })

      const expected = {
        type: type.FETCH_TRAFFIC_SUCCESS,
        id: 'foo-id',
        trafficData: {
          distance: 'a',
          arriveTime: 'b',
          hours: 'c',
          minutes: 'd',
          durationNoCongestion: 'e',
          durationLowCongestion: 'f',
          durationModerateCongestion: 'g',
          durationSeriousCongestion: 'h',
          travelWarnings: 'i'
        }
      }

      const actual = actions.fetchTrafficSuccess('foo-id', bingData)

      expect(actual).to.deep.equal(expected)
      expect(trafficHelper.getSubTree.calledWith(bingData)).to.be.true
    })
  })

  describe('fetchTrafficFailure', () => {
    it('Should return expected properties', () => {
      const actual = actions.fetchTrafficFailure('foo', 'bar')
      const expected = {
        type: type.FETCH_TRAFFIC_FAILURE,
        id: 'foo',
        error: 'bar'
      }
      expect(actual).to.deep.equal(expected)
    })
  })
})
