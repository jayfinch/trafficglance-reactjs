import * as trafficHelper from './traffic-helper'

describe('trafficHelper', () => {
  describe('getSubTree', () => {
    it('Should return relevant hierarchy', () => {
      const data = {
        'resourceSets': [
          {
            'resources': [
              {
                'someProp': 'foo'
              }
            ]
          }
        ]
      }
      const result = trafficHelper.getSubTree(data)
      expect(result).toEqual({ someProp: 'foo' })
    })
  })

  describe('getDurationTime', () => {
    it('Should return hours & minutes', () => {
      const result = trafficHelper.getDurationTime({travelDurationTraffic: 6000})
      expect(result.hours).toEqual(1)
      expect(result.minutes).toEqual(40)
    })
  })

  describe('getDurationTime', () => {
    it('Should return minutes', () => {
      const result = trafficHelper.getDurationTime({travelDurationTraffic: 600})
      expect(result.hours).toEqual(0)
      expect(result.minutes).toEqual(10)
    })
  })

  describe('getDistance', () => {
    it('Should return mi/km value', () => {
      const result = trafficHelper.getDistance({travelDistance: 10})
      expect(result).toEqual(10)
    })
  })

  describe('getArriveTime', () => {
    it('Should return arrival time', () => {
      const currentTime = new Date(1395625613967)
      const result = trafficHelper.getArriveTime({travelDurationTraffic: 60}, currentTime)
      expect(result).toEqual('8:47 pm')
    })
  })

  describe('getDurationByCongestion', () => {
    it('Should return incident warnings ', () => {
      const data = {
        'routeLegs': [
          {
            'itineraryItems': [
              {
                'warnings': [
                  {
                    'text': 'Fake accident',
                    'warningType': 'Accident'
                  }
                ]
              }
            ]
          },
          {
            'itineraryItems': [
              {
                'warnings': [
                  {
                    'text': 'Fake accident 2',
                    'warningType': 'Accident'
                  }
                ]
              },
              {
                'warnings': [
                  {
                    'text': 'Fake accident 3',
                    'warningType': 'Accident'
                  }
                ]
              }
            ]
          }
        ]
      }

      const result = trafficHelper.getDurationByCongestion(data)
      expect(result.travelWarnings).toEqual([
        'Fake accident',
        'Fake accident 2',
        'Fake accident 3'
      ])
    })

    it('Should not repeat incident warnings ', () => {
      const data = {
        'routeLegs': [
          {
            'itineraryItems': [
              {
                'warnings': [
                  {
                    'text': 'Fake accident',
                    'warningType': 'Accident'
                  }
                ]
              }
            ]
          },
          {
            'itineraryItems': [
              {
                'warnings': [
                  {
                    'text': 'Fake accident',
                    'warningType': 'Accident'
                  }
                ]
              },
              {
                'warnings': [
                  {
                    'text': 'Other fake accident',
                    'warningType': 'Accident'
                  }
                ]
              }
            ]
          }
        ]
      }

      const result = trafficHelper.getDurationByCongestion(data)
      expect(result.travelWarnings).toEqual([
        'Fake accident',
        'Other fake accident'
      ])
    })

    it('Should return congestion ', () => {
      const data = {
        'routeLegs': [
          {
            'itineraryItems': [
              {
                'travelDistance': 1,
                'warnings': [
                  {
                    'severity': 'Minor',
                    'warningType': 'TrafficFlow'
                  }
                ]
              },
              {
                'travelDistance': 1,
                'warnings': [
                  {
                    'severity': 'Low Impact',
                    'warningType': 'TrafficFlow'
                  }
                ]
              },
              {
                'travelDistance': 10,
                'warnings': [
                  {
                    'severity': 'unknown-severity',
                    'warningType': 'TrafficFlow'
                  }
                ]
              }
            ]
          },
          {
            'itineraryItems': [
              {
                'travelDistance': 3,
                'warnings': [
                  {
                    'severity': 'Moderate',
                    'warningType': 'TrafficFlow'
                  }
                ]
              },
              {
                'travelDistance': 4,
                'warnings': [
                  {
                    'severity': 'Serious',
                    'warningType': 'TrafficFlow'
                  }
                ]
              },
              {
                'travelDistance': 5
              }
            ]
          }
        ]
      }

      const result = trafficHelper.getDurationByCongestion(data)

      expect(result.durationNoCongestion).toEqual(15)
      expect(result.durationLowCongestion).toEqual(2)
      expect(result.durationModerateCongestion).toEqual(3)
      expect(result.durationSeriousCongestion).toEqual(4)
    })
  })
})
