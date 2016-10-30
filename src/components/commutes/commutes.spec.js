import React from 'react'
import Commutes from './commutes'
import renderer from 'react-test-renderer'

describe('<Commutes />', () => {
  describe('render', () => {
    it('Should render without config', () => {
      let tree = renderer.create(
        <Commutes
          commutes={[]}
          distanceUnit='mi'
          onClickRefresh={jest.fn()}
          configError
        />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    it('Should render with commutes', () => {
      let tree = renderer.create(
        <Commutes
          commutes={[
            {
              id: 0,
              name: 'foo',
              url: 'bar',
              fetchingTraffic: false
            }
          ]}
          distanceUnit='mi'
          onClickRefresh={jest.fn()}
        />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
