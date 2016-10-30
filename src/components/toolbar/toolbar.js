import React, { Component, PropTypes } from 'react'
import './toolbar.less'

class Toolbar extends Component {

  render () {
    return <div className='toolbar'>
      <div className='toolbar__site-name'>
        TrafficGlance
      </div>
      {this.props.isRefreshAvailable && (
        <button className='toolbar__refresh-all' onClick={this.props.onClickRefreshAll}>
          Refresh All
        </button>
      )}
    </div>
  }
}

Toolbar.propTypes = {
  onClickRefreshAll: PropTypes.func,
  isRefreshAvailable: PropTypes.bool
}

export default Toolbar
