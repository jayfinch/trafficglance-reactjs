import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/actions'
import { getApiUrl } from '../../helpers/bing-helper'
import Commutes from '../../components/commutes/commutes'
import Toolbar from '../../components/toolbar/toolbar'
import Footer from '../../components/footer/footer'
import './app.less'

export class App extends Component {

  constructor (props) {
    super(props)
    this.onClickRefresh = this.onClickRefresh.bind(this)
    this.onClickRefreshAll = this.onClickRefreshAll.bind(this)
  }

  componentDidMount () {
    this.props.actions.fetchConfig()
  }

  onClickRefresh (i, segments) {
    this.fetchCommuteTraffic(i, segments)
  }

  onClickRefreshAll () {
    this.props.commutes.forEach((commute, i) => {
      this.fetchCommuteTraffic(i, commute.segments)
    })
  }

  fetchCommuteTraffic (i, segments) {
    const { distanceUnit, apiKey, actions } = this.props
    const url = getApiUrl(segments, distanceUnit, apiKey)
    actions.fetchTraffic(url, i)
  }

  render () {
    const {
      commutes,
      distanceUnit,
      configError
    } = this.props

    return <div>
      <Toolbar
        onClickRefreshAll={this.onClickRefreshAll}
        isRefreshAvailable={Boolean(commutes.length)}
      />
      <div className='container'>
        <Commutes
          commutes={commutes}
          distanceUnit={distanceUnit}
          configError={configError}
          onClickRefresh={this.onClickRefresh}
        />
        <Footer />
      </div>
    </div>
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  commutes: PropTypes.array,
  distanceUnit: PropTypes.oneOf(['mi', 'km']).isRequired,
  apiKey: PropTypes.string.isRequired,
  configError: PropTypes.bool
}

export function mapStateToProps (state) {
  return {...state}
}

export function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
