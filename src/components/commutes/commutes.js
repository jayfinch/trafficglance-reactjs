import Commute from '../commute/commute'
import React, { Component, PropTypes } from 'react'
import './commutes.less'

class Commutes extends Component {

  render () {
    let content
    const {
      commutes,
      distanceUnit,
      configError,
      onClickRefresh
    } = this.props

    if (commutes.length) {
      content = commutes.map((commute, i) => {
        return <Commute
          key={i}
          name={commute.name}
          url={commute.url}
          units={distanceUnit}
          fetchingTraffic={commute.fetchingTraffic}
          fetchTraffic={onClickRefresh.bind(this, i, commute.segments)}
          trafficData={commute.trafficData}
          trafficError={commute.trafficError }
        />
      })
    } else if (configError) {
      content = <div className='loading'>You must set up your config</div>
    } else {
      content = <div className='loading'>Loading...</div>
    }

    return <div className='row' id='routes'>
      {content}
    </div>
  }
}

Commutes.propTypes = {
  onClickRefresh: PropTypes.func.isRequired,
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
  configError: PropTypes.bool
}

export default Commutes
