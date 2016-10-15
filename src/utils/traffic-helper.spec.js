import * as trafficHelper from './traffic-helper'
import mockResponse from '../../test/bing-response'

describe('trafficHelper', () => {
  describe('getDurationTime', () => {
    it('Should return hours & minutes', () => {
      const data = trafficHelper.getSubTree(mockResponse)
      const result = trafficHelper.getDurationTime(data)
      expect(result.hours).to.equal(0)
      expect(result.minutes).to.equal(35)
    })
  })

  describe('getDistance', () => {
    it('Should return mi/km', () => {
      const data = trafficHelper.getSubTree(mockResponse)
      const result = trafficHelper.getDistance(data)
      expect(result).to.equal(23.7)
    })
  })

  describe('getArriveTime', () => {
    it('Should return arrival time', () => {
      const currentTime = new Date(2016, 1, 1, 1, 0, 0)
      const data = trafficHelper.getSubTree(mockResponse)
      const result = trafficHelper.getArriveTime(data, currentTime)
      expect(result).to.equal('1:35 am')
    })
  })
})
