import React from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/actions'
import { App, mapStateToProps, mapDispatchToProps } from './app'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

jest.mock('redux', () => ({
  bindActionCreators: jest.fn(() => ({}))
}))

jest.mock('../../utils/bing-helper', () => {
  return { getApiUrl: jest.fn(() => 'mock-url') }
})

jest.mock('../../actions/actions', () => {
  return { fetchCommuteTraffic: jest.fn() }
})

describe('<App />', () => {
  describe('render', () => {
    it('Should render without config', () => {
      let tree = renderer.create(
        <App
          actions={{
            fetchConfig: jest.fn(),
            fetchTraffic: jest.fn()
          }}
          commutes={[]}
          distanceUnit='mi'
          apiKey='apikey'
          configError
        />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    it('Should render with commutes', () => {
      let tree = renderer.create(
        <App
          actions={{
            fetchConfig: jest.fn(),
            fetchTraffic: jest.fn()
          }}
          commutes={[
            {
              id: 0,
              name: 'foo',
              url: 'bar',
              fetchingTraffic: false
            }
          ]}
          distanceUnit='mi'
          apiKey='apikey'
          configError={false}
        />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    it('Should handle clicking refresh-all button', () => {
      const mockActions = {
        fetchConfig: jest.fn(),
        fetchTraffic: jest.fn()
      }

      let component = <App
        actions={mockActions}
        commutes={[
          {
            id: 0,
            name: 'foo',
            url: 'bar',
            fetchingTraffic: false,
            segments: []
          },
          {
            id: 1,
            name: 'a',
            url: 'b',
            fetchingTraffic: false,
            segments: []
          }
        ]}
        distanceUnit='mi'
        apiKey='apikey'
        configError={false}
      />

      const wrapper = shallow(component)

      wrapper.find('.refresh-all').simulate('click', { preventDefault () {} })

      expect(mockActions.fetchTraffic).toHaveBeenCalledWith('mock-url', 0)
      expect(mockActions.fetchTraffic).toHaveBeenCalledWith('mock-url', 1)
    })
  })

  describe('onClickRefresh', () => {
    it('Should call fetchTraffic', () => {
      let instance = null
      const mockActions = {
        fetchConfig: jest.fn(),
        fetchTraffic: jest.fn()
      }

      renderer.create(<App
        actions={mockActions}
        commutes={[]}
        distanceUnit='mi'
        apiKey='apikey'
        configError={false}
        ref={(ref) => { instance = ref }}
      />)

      instance.onClickRefresh(7, [])
      expect(mockActions.fetchTraffic).toHaveBeenCalledWith('mock-url', 7)
    })
  })

  describe('mapStateToProps', () => {
    it('Should return new but identical object', () => {
      let state = { someProp: 'foo' }
      let actual = mapStateToProps(state)

      expect(actual).toEqual(state)
      expect(actual === state).toEqual(false)
    })
  })

  describe('mapDispatchToProps', () => {
    it('Should return bound actions', () => {
      let dispatch = jest.fn
      let actual = mapDispatchToProps(dispatch)

      expect(bindActionCreators).toHaveBeenCalledWith(actions, dispatch)
      expect(actual.actions).toBeTruthy()
    })
  })
})
