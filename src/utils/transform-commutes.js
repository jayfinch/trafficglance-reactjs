import _ from 'lodash'

export default function (dirtyRoutes) {
  const routeParameterRx = /&rtp=([^&]+)/
  const segmentInfoRx = /(\w*).([\d-.]+)_([\d-.]+)/
  let cleanRoutes = []

  _.each(dirtyRoutes, function (dirtyRoute, i) {
    const matches = routeParameterRx.exec(dirtyRoute.url)
    const routeSegments = matches[1].split('~')
    let cleanSegments = []

    _.each(routeSegments, function (segment) {
      const segmentInfo = segmentInfoRx.exec(segment)
      const waypointType = (segmentInfo[1] === 'pos') ? 'wp' : 'vwp'

      cleanSegments.push({
        waypointType: waypointType,
        latitude: segmentInfo[2],
        longitude: segmentInfo[3]
      })
    })

    cleanRoutes.push({
      id: i,
      name: dirtyRoute.name,
      url: dirtyRoute.url,
      segments: cleanSegments
    })
  })

  return cleanRoutes
}
