import { getApiUrl } from './bing-helper'

describe('bingApiHelper', () => {
  describe('getApiUrl', () => {
    it('Should form bing traffic api request', () => {
      const segments = [
        {
          waypointType: 'wp',
          latitude: '45.060512',
          longitude: '-92.074402'
        },
        {
          waypointType: 'vwp',
          latitude: '44.032439',
          longitude: '-94.087854'
        },
        {
          waypointType: 'wp',
          latitude: '45.862776',
          longitude: '-92.306506'
        }
      ]

      const newUrl = getApiUrl(segments, 'mi', 'mykey')
      expect(newUrl).toEqual('http://dev.virtualearth.net/REST/V1/Routes/Driving?&distanceUnit=mi&wp.0=45.060512,-92.074402&vwp.1=44.032439,-94.087854&wp.2=45.862776,-92.306506&key=mykey')
    })
  })
})
