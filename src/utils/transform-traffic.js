import moment from 'moment'

export default function (bingData) {
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
