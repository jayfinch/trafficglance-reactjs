import React, { Component, PropTypes } from 'react'
import Commute from './commute'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import _ from 'lodash'
import 'whatwg-fetch'

class App extends Component {

  componentDidMount () {
    this.props.actions.fetchConfig()
  }

  _fetchTraffic (i, segments) {
    const { actions, distanceUnit, apiKey } = this.props
    let url = 'http://dev.virtualearth.net/REST/V1/Routes/Driving?&'
    url += 'distanceUnit=' + distanceUnit + '&'

    _.each(segments, function (segment, i) {
      url += segment.waypointType + '.' + i + '=' +
      segment.latitude + ',' +
      segment.longitude + '&'
    })

    url += 'key=' + apiKey
    actions.fetchTraffic(url, i)
  }

  render () {
    const { commutes, distanceUnit, errorConfig } = this.props

    var routes = <div className='loading'>Loading...</div>

    if (errorConfig) {
      routes = <div className='loading'>You must set up your config file</div>
    }

    if (commutes.length) {
      routes = commutes.map(function (route, i) {
        return (
        <Commute
          key={i}
          name={route.name}
          url={route.url}
          units={distanceUnit}
          fetchingTraffic={route.fetchingTraffic}
          fetchTraffic={() => this._fetchTraffic(i, route.segments)}
          trafficData={route.trafficData} />
        )
      }.bind(this))
    }

    return (
      <div>
        <div className='toolbar'>
          <div className='site-name'>
            TrafficGlance
          </div>
          <a href='#' className='refresh-all'>
            <span className='glyphicon glyphicon-refresh' aria-hidden='true'></span>
          </a>
        </div>
        <div className='container'>
          <div className='row' id='routes'>
            {routes}
          </div>
          <div className='row credit'>
            <div className='col-xs-12'>
              Powered by Bing™
            </div>
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object,
  commutes: PropTypes.array,
  distanceUnit: PropTypes.string,
  apiKey: PropTypes.string,
  errorConfig: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    commutes: state.appData.commutes,
    apiKey: state.appData.apiKey,
    distanceUnit: state.appData.distanceUnit,
    errorConfig: state.appData.errorConfig
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
