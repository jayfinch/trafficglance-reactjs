import moment from 'moment'
import _ from 'lodash'

export function transformTraffic (bingData) {
  const subTree = getSubTree(bingData)

  return {
    ...getDurationTime(subTree),
    ...getDurationByCongestion(subTree),
    distance: getDistance(subTree),
    arriveTime: getArriveTime(subTree)
  }
}

export function getSubTree (bingData) {
  return bingData.resourceSets[0].resources[0]
}

export function getDurationTime (data) {
  const totalSeconds = data.travelDurationTraffic
  let durationObj = moment.duration({seconds: totalSeconds})
  const hoursNumber = durationObj.hours()
  durationObj.subtract({hours: hoursNumber})
  const minutesNumber = durationObj.minutes()

  return {
    hours: hoursNumber,
    minutes: minutesNumber
  }
}

export function getDistance (data) {
  return Math.round(data.travelDistance * 10) / 10
}

export function getArriveTime (data, currentTime = new Date()) {
  const totalSeconds = data.travelDurationTraffic
  return moment(currentTime)
    .add(totalSeconds, 's')
    .format('h:mm a')
}

export function getDurationByCongestion (data) {
  const itineraryLegs = data.routeLegs
  let totalWarnings = []
  let noCongestion = 0
  let lowCongestion = 0
  let moderateCongestion = 0
  let seriousCongestion = 0
  let warningWhitelist = [
    'Accident',
    'BlockedRoad',
    'Congestion',
    'DisabledVehicle',
    'Miscellaneous',
    'Other',
    'OtherTrafficIncidents',
    'PlannedEvents',
    'RoadClosures',
    'RoadHazard',
    'ScheduledConstruction',
    'SeasonalClosures',
    'Weather'
  ]

  // each hard destination is a "leg"
  itineraryLegs.forEach((leg) => {
    let itineraryItems = leg.itineraryItems

    // each leg broken into segments
    itineraryItems.forEach((item) => {
      if (item.warnings) {
        item.warnings.forEach((warning) => {
          if (warning.warningType === 'TrafficFlow') {
            // add up distance by congestion
            switch (warning.severity) {
              case 'Minor':
                lowCongestion += item.travelDistance
                break
              case 'Low Impact':
                lowCongestion += item.travelDistance
                break
              case 'Moderate':
                moderateCongestion += item.travelDistance
                break
              case 'Serious':
                seriousCongestion += item.travelDistance
                break
              default:
                noCongestion += item.travelDistance
            }
          } else if (_.includes(warningWhitelist, warning.warningType)) {
            // capture non-congestion warnings
            totalWarnings = _.union(totalWarnings, [warning.text])
          }
        })
      } else {
        // default segment to green if no congestion
        noCongestion += item.travelDistance
      }
    })
  })

  return {
    durationNoCongestion: noCongestion,
    durationLowCongestion: lowCongestion,
    durationModerateCongestion: moderateCongestion,
    durationSeriousCongestion: seriousCongestion,
    travelWarnings: totalWarnings
  }
}
