import React, { Component, PropTypes } from 'react'
import Chart from './chart'

class Commute extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      travelDurationStats: false,
      arriveTime: null,
      distance: null,
      minutes: null,
      fetchingTraffic: false
    }
  }

  render () {
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
              <a href='#' title='Refresh' onClick={this.refreshTraffic.bind(this)}>
                {this._renderImage()}
              </a>
            </div>
            <div className='col-xs-7 col-sm-8 stats'>
              <div className='duration'>
                <span className='nobreak'>{this.state.travelDurationStats ? <span className='nobreak'>{this.state.minutes}<span className='unit'>&nbsp;min</span></span> : '–––'}</span>
              </div>
              <div className='detail'>
                <span className='nobreak'>{this.state.travelDurationStats ? this.state.distance + ' ' + this.props.units : '–––'}</span>
              </div>
              <div className='detail'>
                <span className='nobreak'>{this.state.travelDurationStats ? this.state.arriveTime : '–––'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  refreshTraffic () {
    this.setState({
      travelDurationStats: false,
      arriveTime: null,
      distance: null,
      minutes: null,
      fetchingTraffic: true
    })

    setTimeout(() => {
      this.setState({
        travelDurationStats: true,
        arriveTime: '1:30 PM',
        distance: '23.7',
        minutes: 33,
        fetchingTraffic: false
      })
    }, 1000)
  }

  _renderImage () {
    if (this.state.fetchingTraffic) {
      return <img src='images/refresh-circle.svg' className='img-responsive center-block rotate' />
    } else if (this.state.travelDurationStats) {
      return <Chart />
    } else {
      return <img src='images/refresh-circle.svg' className='img-responsive center-block' />
    }
  }
}

Commute.propTypes = {
  name: PropTypes.string,
  units: PropTypes.string
}

export default Commute
