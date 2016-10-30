const getSubTree = jest.fn(() => 'tree')

const getDistance = jest.fn(() => 'a')

const getArriveTime = jest.fn(() => 'b')

const getDurationTime = jest.fn(() => {
  return {
    hours: 'c',
    minutes: 'd'
  }
})

const getDurationByCongestion = jest.fn(() => {
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
