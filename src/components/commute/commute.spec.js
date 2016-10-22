import React from 'react'
import Commute from './commute'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

describe('<Commute />', () => {
  it('Should handle clicking refresh', () => {
    const onButtonClick = jest.fn()
    let component = <Commute
        name='foo'
        url='http://foo.com'
        units='mi'
        fetchingTraffic={false}
        fetchTraffic={onButtonClick}/>

    const wrapper = shallow(component)
    wrapper.find('button').simulate('click')

    expect(onButtonClick).toHaveBeenCalled()
  })

  it('Should render chart', () => {
    let tree = renderer.create(
      <Commute
        name='foo'
        url='http://foo.com'
        units='mi'
        fetchingTraffic={false}
        trafficData={{
          durationSeriousCongestion: 1,
          durationModerateCongestion: 2,
          durationLowCongestion: 3,
          durationNoCongestion: 4
        }}
        fetchTraffic={() => {}}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Should render placeholder name if not provided', () => {
    let tree = renderer.create(
      <Commute
        url='http://foo.com'
        units='mi'
        fetchingTraffic={false}
        fetchTraffic={() => {}}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Should render image', () => {
    let tree = renderer.create(
      <Commute
        name='foo'
        url='http://foo.com'
        units='mi'
        fetchingTraffic={false}
        fetchTraffic={() => {}}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Should render in-progress image', () => {
    let tree = renderer.create(
      <Commute
        name='foo'
        url='http://foo.com'
        units='mi'
        fetchingTraffic={true}
        fetchTraffic={() => {}}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
