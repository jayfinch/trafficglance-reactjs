import React, { Component, PropTypes } from 'react'
import Chart from './chart'

class Commute extends Component {

  onClickRefresh (event) {
    event.preventDefault()
    this.props.fetchTraffic()
  }

  render () {
    const { name, url, trafficData, units, trafficError } = this.props

    let renderImage = <img src='images/refresh-circle.svg' className='img-responsive center-block' />

    if (this.props.fetchingTraffic) {
      renderImage = <img src='images/refresh-circle.svg' className='img-responsive center-block rotate' />
    } else if (this.props.trafficData) {
      renderImage = <Chart />
    }

    return (
      <div className='route col-sm-6 col-md-4'>
        <div className='card'>
          <div className='name'>
            <a href={url} target='_blank'>
              {name}
            </a>
            {trafficError
              ? <span className='glyphicon glyphicon-exclamation-sign pull-right' aria-hidden='true'></span>
              : ''
            }
          </div>

          <div className='row'>
            <div className='col-xs-5 col-sm-4 chart'>
              <a href='#' title='Refresh' onClick={this.onClickRefresh.bind(this)}>
                {renderImage}
              </a>
            </div>
            <div className='col-xs-7 col-sm-8 stats'>
              <div className='duration'>
                <span className='nobreak'>{trafficData
                  ? <span className='nobreak'>{trafficData.minutes}<span className='unit'>&nbsp;min</span></span>
                  : '–––'}</span>
              </div>
              <div className='detail'>
                <span className='nobreak'>{trafficData
                  ? trafficData.distance + ' ' + units
                  : '–––'}</span>
              </div>
              <div className='detail'>
                <span className='nobreak'>{trafficData
                  ? trafficData.arriveTime
                  : '–––'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Commute.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  units: PropTypes.oneOf(['mi', 'km']).isRequired,
  fetchingTraffic: PropTypes.bool,
  fetchTraffic: PropTypes.func.isRequired,
  trafficData: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    distance: PropTypes.number,
    arriveTime: PropTypes.string
  }),
  trafficError: PropTypes.bool
}

export default Commute
