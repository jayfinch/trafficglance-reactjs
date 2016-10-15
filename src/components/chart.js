import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs'

const chartOptions = {
  animation: true,
  animateRotate: false,
  animateScale: true,
  percentageInnerCutout: 75,
  animationSteps: 40,
  segmentShowStroke: false,
  showTooltips: false
}

const data = {
  seriousCongestion: 10,
  moderateCongestion: 5,
  lowCongestion: 2,
  noCongestion: 5,
  showTooltips: false
}

const mockData = [
  {
    value: data.seriousCongestion,
    color: '#e01e1b'
  },
  {
    value: data.moderateCongestion,
    color: '#fc8d0d'
  },
  {
    value: data.lowCongestion,
    color: '#ede725'
  },
  {
    value: data.noCongestion,
    color: '#45c43f'
  }
]

class Chart extends Component {
  render () {
    return <Doughnut
      data={mockData}
      options={chartOptions}
      width='90'
      height='90'
      className='img-responsive' />
  }
}

export default Chart
