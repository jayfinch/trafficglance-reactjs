import { transformCommutes } from './commutes-helper'

describe('commutesHelper', () => {
  describe('transformCommutes', () => {
    it('Should parse config urls into tree', () => {
      const dirtyData = [
        {
          'name': 'Disney World',
          'url': 'http://www.bing.com/maps/?v=2&cp=28.408043~-81.442907&lvl=11&dir=0&sty=r&rtp=pos.28.432114_-81.308201_1%20Jeff%20Fuqua%20Blvd%2C%20Orlando%2C%20FL_Orlando%20International%20Airport_(407)%20825-8463_e_YN873x128112508~pos.28.404329_-81.580612_Walt%20Disney%20World%20Resort%2C%20FL___e_&mode=D&rtop=0~0~0~&form=LMLTCC'
        },
        {
          'name': 'Disneyland',
          'url': 'http://www.bing.com/maps/?v=2&cp=33.746724~-117.878541&lvl=12&dir=0&sty=r&rtp=pos.33.679127_-117.861024_18601%20Airport%20Way%2C%20Santa%20Ana%2C%20CA_John%20Wayne%20Airport%20%E2%80%93%20Orange%20County_(949)%20252-5200_e_YN873x114341149~pos.33.815472_-117.923691_Disneyland%2C%20CA___e_&mode=D&rtop=0~0~0~&form=LMLTCC'
        }
      ]

      let cleanData = transformCommutes(dirtyData)

      expect(cleanData.length).toEqual(2)
      expect(cleanData[0].id).toEqual(0)
      expect(cleanData[0].name).toEqual('Disney World')
      expect(cleanData[0].url).toEqual('http://www.bing.com/maps/?v=2&cp=28.408043~-81.442907&lvl=11&dir=0&sty=r&rtp=pos.28.432114_-81.308201_1%20Jeff%20Fuqua%20Blvd%2C%20Orlando%2C%20FL_Orlando%20International%20Airport_(407)%20825-8463_e_YN873x128112508~pos.28.404329_-81.580612_Walt%20Disney%20World%20Resort%2C%20FL___e_&mode=D&rtop=0~0~0~&form=LMLTCC')

      expect(cleanData[0].segments.length).toEqual(2)
      expect(cleanData[0].segments[0].waypointType).toEqual('wp')
      expect(cleanData[0].segments[0].latitude).toEqual('28.432114')
      expect(cleanData[0].segments[0].longitude).toEqual('-81.308201')
    })
  })
})
