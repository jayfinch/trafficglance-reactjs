import React, { PropTypes } from 'react'
import { Doughnut } from 'react-chartjs'

const color = {
  RED: '#e01e1b',
  ORANGE: '#fc8d0d',
  YELLOW: '#ede725',
  GREEN: '#45c43f'
}

const doughnutOptions = {
  animation: true,
  animateRotate: false,
  animateScale: true,
  percentageInnerCutout: 70,
  animationSteps: 40,
  segmentShowStroke: false,
  showTooltips: false
}

export default function Chart ({data}) {
  const doughnutValues = [
    {
      value: data.durationSeriousCongestion,
      color: color.RED
    },
    {
      value: data.durationModerateCongestion,
      color: color.ORANGE
    },
    {
      value: data.durationLowCongestion,
      color: color.YELLOW
    },
    {
      value: data.durationNoCongestion,
      color: color.GREEN
    }
  ]
  return <Doughnut
    data={doughnutValues}
    options={doughnutOptions}
    width='90'
    height='90'
    className='img-responsive' />
}

Chart.propTypes = {
  data: PropTypes.object
}
