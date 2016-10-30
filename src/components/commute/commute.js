import React, { Component, PropTypes } from 'react'
import Chart from '../chart/chart'
import './commute.less'

class Commute extends Component {

  onClickRefresh () {
    this.props.fetchTraffic()
  }

  getImage (fetchingTraffic, trafficData) {
    if (fetchingTraffic) {
      return <img
        src='images/refresh-circle.svg'
        className='card__refresh-btn card__refresh-btn--progress img-responsive center-block'
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
        className='card__refresh-btn img-responsive center-block'
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
          <div className='card__name'>
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
                className='card__fetch-button'>
                  {this.getImage(fetchingTraffic, trafficData)}
              </button>
            </div>
            <div className='col-xs-7 col-sm-8 card-stats'>

              <div className='card-stats__duration'>
                {trafficData
                  ? <span>
                      {trafficData.minutes}
                        <span className='card-stats__unit'>&nbsp;min</span>
                    </span>
                  : '–––'}
              </div>

              <div className='card-stats__detail'>
                {trafficData ? trafficData.distance + ' ' + units : '–––'}
              </div>

              <div className='card-stats__detail'>
                {trafficData ? trafficData.arriveTime : '–––'}
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
