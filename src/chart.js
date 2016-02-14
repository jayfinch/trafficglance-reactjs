import React from 'react'
import ReactDOM from 'react-dom'
import ChartJS from 'react-chartjs'

var chartOptions = {
  animation: true,
  animateRotate: false,
  animateScale: true,
  percentageInnerCutout: 70,
  animationSteps: 40,
  segmentShowStroke : false,
  showTooltips: false
}

 var data = {
  seriousCongestion: 10,
  moderateCongestion: 5,
  lowCongestion: 2,
  noCongestion: 5,
  showTooltips: false
 }

var mockData = [
  {
    value: data.seriousCongestion,
    color: '#e01e1b'
  },
  {
    value : data.moderateCongestion,
    color : '#fc8d0d'
  },
  {
    value : data.lowCongestion,
    color : '#ede725'
  },
  {
    value : data.noCongestion,
    color : '#45c43f'
  }
]

var Chart = React.createClass({
  render: function () {
    return <ChartJS.Doughnut data={mockData} options={chartOptions} width='150' height='150' className='img-responsive' />
  }
})

module.exports = Chart
