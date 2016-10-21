const getSubTree = jest.fn().mockImplementation(() => 'tree')

const getDistance = jest.fn().mockImplementation(() => 'a')

const getArriveTime = jest.fn().mockImplementation(() => 'b')

const getDurationTime = jest.fn().mockImplementation(() => {
  return {
    hours: 'c',
    minutes: 'd'
  }
})

const getDurationByCongestion = jest.fn().mockImplementation(() => {
  return {
    durationNoCongestion: 'e',
    durationLowCongestion: 'f',
    durationModerateCongestion: 'g',
    durationSeriousCongestion: 'h',
    travelWarnings: 'i'
  }
})

export {
  getSubTree,
  getDistance,
  getArriveTime,
  getDurationTime,
  getDurationByCongestion
}
