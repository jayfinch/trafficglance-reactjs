import React from 'react'
import Chart from './chart'
import renderer from 'react-test-renderer'

describe('<Chart />', () => {
  it('Should render duration segments', () => {
    let tree = renderer.create(
      <Chart
        data={{
          durationSeriousCongestion: 1,
          durationModerateCongestion: 2,
          durationLowCongestion: 3,
          durationNoCongestion: 4
        }}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
