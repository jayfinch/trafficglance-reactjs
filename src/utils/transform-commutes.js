import _ from 'lodash'

export default function (oldRoutes) {
  const routeParameterRx = /&rtp=([^&]+)/
  const segmentInfoRx = /(\w*).([\d-.]+)_([\d-.]+)/
  let newRoutes = []

  _.each(oldRoutes, function (oldRoute, i) {
    const matches = routeParameterRx.exec(oldRoute.url)
    const routeSegments = matches[1].split('~')
    let newSegments = []

    _.each(routeSegments, function (segment) {
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
