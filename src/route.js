import React from 'react'
import ReactDOM from 'react-dom'

var Route = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    units: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      travelDurationStats: false
    }
  },

  refreshTraffic: function () {
    this.setState({
      travelDurationStats: true,
      arriveTime: '1:30 PM',
      distance: '23.7',
      minutes: 33
    })
  },

  render: function () {
    return (
      <div className='route col-sm-6 col-md-4'>
        <div className='name'>
          <a href='{this.props.url}' target='_blank'>{this.props.name}</a>
        </div>
        <div className='row'>
          <div className='col-xs-5 col-sm-4 chart'>
            <a href='#' className='refresh' title='Refresh' onClick={this.refreshTraffic}>
              <img src='images/refresh-circle.svg' className='img-responsive center-block' />
            </a>
          </div>
          <div className='col-xs-7 col-sm-8 stats'>
            <div className='duration'><span className='nobreak'>
              {this.state.travelDurationStats ? <span className='nobreak'>{this.state.minutes}<span className='unit'>&nbsp;min</span></span> : '—'}
            </span></div>

            <div className='detail'><span className='nobreak'>
              {this.state.travelDurationStats ? this.state.distance + ' ' + this.props.units : '—'}
            </span></div>

            <div className='detail'><span className='nobreak'>
              {this.state.travelDurationStats ? this.state.arriveTime : '—'}
            </span></div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Route
