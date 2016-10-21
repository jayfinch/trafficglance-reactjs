import React from 'react'
import Commute from './commute'
import {shallow} from 'enzyme'

describe('<Commute />', () => {
  describe('render', () => {
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

    it('Should render name with link', () => {
      let component = <Commute
        name='foo'
        url='http://foo.com'
        units='mi'
        fetchingTraffic={false}
        fetchTraffic={() => {}}/>

      const wrapper = shallow(component)

      expect(wrapper.find('.name').text().trim()).toEqual('foo')
      expect(wrapper.find('a').props().href).toEqual('http://foo.com')
    })

    it('Should render chart', () => {
      let component = <Commute
        name='foo'
        url='http://foo.com'
        units='mi'
        fetchingTraffic={false}
        trafficData={{}}
        fetchTraffic={() => {}}/>

      const wrapper = shallow(component)

      expect(wrapper.find('.chart-component').length).toEqual(1)
    })

    it('Should render image', () => {
      let component = <Commute
        name='foo'
        url='http://foo.com'
        units='mi'
        fetchingTraffic={false}
        fetchTraffic={() => {}}/>

      const wrapper = shallow(component)

      expect(wrapper.find('.refresh-btn').length).toEqual(1)
    })

    it('Should render in-progress image', () => {
      let component = <Commute
        name='foo'
        url='http://foo.com'
        units='mi'
        fetchingTraffic={true}
        fetchTraffic={() => {}}/>

      const wrapper = shallow(component)

      expect(wrapper.find('.refresh-btn-progress').length).toEqual(1)
    })
  })
})
