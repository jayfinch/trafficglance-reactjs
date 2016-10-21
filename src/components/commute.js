import React, { Component, PropTypes } from 'react'
import Chart from './chart'

class Commute extends Component {

  onClickRefresh () {
    this.props.fetchTraffic()
  }

  getImage (fetchingTraffic, trafficData) {
    if (fetchingTraffic) {
      return <img
        src='images/refresh-circle.svg'
        className='refresh-btn-progress img-responsive center-block rotate'
      />
    } else if (trafficData) {
      return <span className='chart-component'>
        <Chart data={{
          durationSeriousCongestion: trafficData.durationSeriousCongestion,
          durationModerateCongestion: trafficData.durationModerateCongestion,
          durationLowCongestion: trafficData.durationLowCongestion,
          durationNoCongestion: trafficData.durationNoCongestion
        }} />
      </span>
    } else {
      return <img
        src='images/refresh-circle.svg'
        className='refresh-btn img-responsive center-block'
      />
    }
  }

  render () {
    const {
      name,
      url,
      trafficData,
      units,
      trafficError,
      fetchingTraffic
    } = this.props

    return (
      <div className='route col-sm-6 col-md-4'>
        <div className='card'>
          <div className='name'>
            <a href={url} target='_blank'>
              {name || 'Your Commute'}
            </a>
            {trafficError
              ? <span
                className='glyphicon glyphicon-exclamation-sign pull-right'
                aria-hidden='true'></span>
              : ''
            }
          </div>

          <div className='row'>
            <div className='col-xs-5 col-sm-4 chart'>
              <button
                title='Refresh'
                onClick={(e) => this.onClickRefresh(e)}
                className='fetch-button'>
                  {this.getImage(fetchingTraffic, trafficData)}
              </button>
            </div>
            <div className='col-xs-7 col-sm-8 stats'>
              <div className='duration'>
                <span className='nobreak'>{trafficData
                  ? <span className='nobreak'>{trafficData.minutes}
                      <span className='unit'>&nbsp;min</span>
                    </span>
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
