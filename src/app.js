import React from 'react'
import ReactDOM from 'react-dom'
import Route from './route.js'

var TrafficGlanceApp = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    units: React.PropTypes.string
  },

  _renderRoutes: function () {
    var units = this.props.units
    return this.props.data.map(function (route, i) {
      return (
        <Route name={route.name} url={route.url} key={i} units={units} />
      )
    })
  },

  render: function () {
    return (
      <div>
        <div className='toolbar'>
          <div className='site-name'>TrafficGlance</div>
          <a href='#' className='refresh-all'><span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
        </div>
        <div className='container'>
          <div className='row' id='routes'>
            {this._renderRoutes()}
          </div>
          <div className='row credit'>
            <div className='col-xs-12'><a href='#'>Powered by Bing™</a></div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = TrafficGlanceApp
