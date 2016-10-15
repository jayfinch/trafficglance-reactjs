export function buildUrl (segments, distanceUnit, apiKey) {
  let url = 'http://dev.virtualearth.net/REST/V1/Routes/Driving?'
  url += `&distanceUnit=${distanceUnit}`

  segments.forEach((seg, i) => {
    url += `&${seg.waypointType}.${i}=${seg.latitude},${seg.longitude}`
  })

  url += `&key=${apiKey}`
  return url
}
