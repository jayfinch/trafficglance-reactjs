import moment from 'moment'

export function buildUrl (segments, distanceUnit, apiKey) {
  let url = 'http://dev.virtualearth.net/REST/V1/Routes/Driving?'
  url += `&distanceUnit=${distanceUnit}`

  segments.forEach((seg, i) => {
    url += `&${seg.waypointType}.${i}=${seg.latitude},${seg.longitude}`
  })

  url += `&key=${apiKey}`
  return url
}

export function transformCommutes (oldRoutes) {
  const routeParameterRx = /&rtp=([^&]+)/
  const segmentInfoRx = /(\w*).([\d-.]+)_([\d-.]+)/
  let newRoutes = []

  oldRoutes.forEach((oldRoute, i) => {
    const matches = routeParameterRx.exec(oldRoute.url)
    const routeSegments = matches[1].split('~')
    let newSegments = []

    routeSegments.forEach((segment) => {
      const segmentInfo = segmentInfoRx.exec(segment)
      const waypointType = (segmentInfo[1] === 'pos') ? 'wp' : 'vwp'

      newSegments.push({
        waypointType: waypointType,
        latitude: segmentInfo[2],
        longitude: segmentInfo[3]
      })
    })

    newRoutes.push({
      id: i,
      name: oldRoute.name,
      url: oldRoute.url,
      segments: newSegments
    })
  })

  return newRoutes
}

export function transformTraffic (bingData) {
  let data = bingData.resourceSets[0].resources[0]

  const totalSeconds = data.travelDurationTraffic
  var durationObj = moment.duration({seconds: totalSeconds})
  var hoursNumber = durationObj.hours()
  durationObj.subtract({hours: hoursNumber})
  var minutesNumber = durationObj.minutes()

  const distance = Math.round(data.travelDistance * 10) / 10

  var arriveTime = moment().add(totalSeconds, 's').format('h:mm a')

  return {
    hours: hoursNumber,
    minutes: minutesNumber,
    distance: distance,
    arriveTime: arriveTime
  }
}
