import React, { Component, PropTypes } from 'react'
import Commute from './commute'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import 'whatwg-fetch'

class App extends Component {

  componentDidMount () {
    this.props.actions.fetchConfig()
  }

  render () {
    const { actions, commutes, distanceUnit, apiKey } = this.props

    var routes = <div className='loading'>Loading...</div>

    if (commutes.length) {
      routes = commutes.map(function (route, i) {
        return (
        <Commute
          key={i}
          name={route.name}
          url={route.url}
          units={distanceUnit}
          fetchingTraffic={route.fetchingTraffic}
          fetchTraffic={() => actions.fetchTraffic(i, distanceUnit, apiKey, route.segments)}
          trafficData={route.trafficData} />
        )
      })
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
  apiKey: PropTypes.string
}

function mapStateToProps (state) {
  return {
    commutes: state.appData.commutes,
    apiKey: state.appData.apiKey,
    distanceUnit: state.appData.distanceUnit
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
