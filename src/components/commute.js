import React, { Component, PropTypes } from 'react'
import Chart from './chart'

class Commute extends Component {

  constructor (props, context) {
    super(props, context)
  }

  render () {
    const { trafficData, units } = this.props
    return (
      <div className='route col-sm-6 col-md-4'>
        <div className='card'>
          <div className='name'>
            <a href='{this.props.url}' target='_blank'>
              {this.props.name}
            </a>
          </div>
          <div className='row'>
            <div className='col-xs-5 col-sm-4 chart'>
              <a href='#' title='Refresh' onClick={this.props.fetchTraffic}>
                {this._renderImage()}
              </a>
            </div>
            <div className='col-xs-7 col-sm-8 stats'>
              <div className='duration'>
                <span className='nobreak'>{trafficData ? <span className='nobreak'>{trafficData.minutes}<span className='unit'>&nbsp;min</span></span> : '–––'}</span>
              </div>
              <div className='detail'>
                <span className='nobreak'>{trafficData ? trafficData.distance + ' ' + units : '–––'}</span>
              </div>
              <div className='detail'>
                <span className='nobreak'>{trafficData ? trafficData.arriveTime : '–––'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _renderImage () {
    if (this.props.fetchingTraffic) {
      return <img src='images/refresh-circle.svg' className='img-responsive center-block rotate' />
    } else if (this.props.trafficData) {
      return <Chart />
    } else {
      return <img src='images/refresh-circle.svg' className='img-responsive center-block' />
    }
  }
}

Commute.propTypes = {
  name: PropTypes.string,
  units: PropTypes.string,
  actions: PropTypes.object
}

export default Commute
