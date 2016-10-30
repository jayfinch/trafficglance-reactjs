import React from 'react'
import Toolbar from './toolbar'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

describe('<Toolbar />', () => {
  describe('render', () => {
    it('Should handle clicking refresh-all button', () => {
      const mock = jest.fn()
      const component = <Toolbar
        onClickRefreshAll={mock}
        isRefreshAvailable
      />

      const wrapper = shallow(component)
      wrapper.find('.toolbar__refresh-all').simulate('click', { preventDefault () {} })

      expect(mock).toHaveBeenCalled()
    })

    it('Should render with refresh button', () => {
      const mock = jest.fn()
      const tree = renderer.create(
        <Toolbar
          onClickRefreshAll={mock}
          isRefreshAvailable
        />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    it('Should render without refresh button', () => {
      const mock = jest.fn()
      const tree = renderer.create(
        <Toolbar
          onClickRefreshAll={mock}
        />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
