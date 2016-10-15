import React from 'react'
import Commute from './commute'
import {shallow} from 'enzyme'
import sinon from 'sinon'

describe('<Commute />', () => {
  describe('render', () => {
    it('Should render name with link', () => {
      let component = <Commute
        name='foo'
        url='http://foo.com'
        units='mi'
        fetchingTraffic={false}
        fetchTraffic={() => {}}/>

      const wrapper = shallow(component)

      expect(wrapper.find('.name').text().trim()).to.equal('foo')
      expect(wrapper.find('a').props().href).to.equal('http://foo.com')
    })

    it('Should handle clicking refresh', () => {
      const onButtonClick = sinon.spy()
      let component = <Commute
        name='foo'
        url='http://foo.com'
        units='mi'
        fetchingTraffic={false}
        fetchTraffic={onButtonClick}/>

      const wrapper = shallow(component)
      wrapper.find('button').simulate('click')

      expect(onButtonClick).to.have.property('callCount', 1)
    })
  })
})
