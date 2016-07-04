import React, { Component, PropTypes } from 'react'
import Commute from './commute'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { buildUrl } from '../utils/bing'
import 'whatwg-fetch'

class App extends Component {

  componentDidMount () {
    this.props.actions.fetchConfig()
  }

  fetchCommuteTraffic (i, segments) {
    const { distanceUnit, apiKey, actions } = this.props
    const url = buildUrl(segments, distanceUnit, apiKey)
    actions.fetchTraffic(url, i)
  }

  onClickRefreshAll (event) {
    event.preventDefault()
    this.props.commutes.forEach((commute, i) => {
      this.fetchCommuteTraffic(i, commute.segments)
    })
  }

  render () {
    const { commutes, distanceUnit, configError } = this.props

    var commutesEl = <div className='loading'>Loading...</div>

    if (configError) {
      commutesEl = <div className='loading'>You must set up your config</div>
    }

    if (commutes.length) {
      commutesEl = commutes.map((commute, i) => {
        return (
        <Commute
          key={i}
          name={commute.name}
          url={commute.url}
          units={distanceUnit}
          fetchingTraffic={commute.fetchingTraffic}
          fetchTraffic={() => this.fetchCommuteTraffic(i, commute.segments)}
          trafficData={commute.trafficData}
          trafficError={commute.trafficError }/>
        )
      })
    }

    return (
      <div>
        <div className='toolbar'>
          <div className='site-name'>
            TrafficGlance
          </div>
          <a href='#' className='refresh-all' onClick={this.onClickRefreshAll.bind(this)}>
            <span className='glyphicon glyphicon-refresh' aria-hidden='true'></span>
          </a>
        </div>
        <div className='container'>
          <div className='row' id='routes'>
            {commutesEl}
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
  actions: PropTypes.object.isRequired,
  commutes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    url: PropTypes.string.isRequired,
    fetchingTraffic: PropTypes.bool,
    trafficError: PropTypes.bool,
    segments: PropTypes.arrayOf(PropTypes.shape({
      waypointType: PropTypes.string.isRequired,
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired
    })),
    trafficData: PropTypes.object
  })).isRequired,
  distanceUnit: PropTypes.oneOf(['mi', 'km']).isRequired,
  apiKey: PropTypes.string.isRequired,
  configError: PropTypes.bool
}

function mapStateToProps (state) {
  return {...state}
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
