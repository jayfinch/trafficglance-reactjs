import React, { Component, PropTypes } from 'react'
import Commute from './commute'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'

class App extends Component {

  componentDidMount () {
    setTimeout(() => {
      this.props.actions.bootstrap()
    }, 500)
  }

  render () {
    const { commutes, units, actions, fetching } = this.props

    var routes = <div className='loading'>Loading...</div>

    if (commutes.length) {
      routes = commutes.map(function (route, i) {
        return (
        <Commute
          name={route.name}
          url={route.url}
          key={i}
          units={units}
          fetchingTraffic={route.fetchingTraffic}
          fetchTraffic={() => actions.fetchTraffic(i)}
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
          <a href='#' className='refresh-all'><span className='glyphicon glyphicon-refresh' aria-hidden='true'></span></a>
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
  commutes: PropTypes.array,
  units: PropTypes.string,
  actions: PropTypes.object
}

function mapStateToProps (state) {
  return {
    commutes: state.appData.commutes,
    units: state.appData.units
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
