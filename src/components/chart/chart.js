import React, { Component, PropTypes } from 'react'
import { Doughnut } from 'react-chartjs'

class Chart extends Component {
  render () {
    const {data} = this.props
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
      className='img-responsive'
    />
  }
}

Chart.propTypes = {
  data: PropTypes.object
}

export default Chart
