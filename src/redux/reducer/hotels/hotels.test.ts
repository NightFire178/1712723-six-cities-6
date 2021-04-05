import {hotelsActionCreators, hotelsActionEnum} from "../types-action-creators/hotels";
import mockOneHotel, {mockArrayHotels} from "../../../mock/mock-hotels";
import hotels from "./hotels";
import Hotel from "../../../types/hotel";

describe(`action hotels creation`, ()=>{
  it(`action creators  UP_DATE_IS_FAVORITE`, ()=>{
    const payload = {
      isFavorite: true,
      id: 5
    }
    const upDateIsFavorite= {
      type: hotelsActionEnum.UP_DATE_IS_FAVORITE,
      payload
    }
    expect(hotelsActionCreators.UP_DATE_IS_FAVORITE(payload)).toEqual(upDateIsFavorite)
  })
  it(`action creators UP_DATE_HOTELS`, ()=>{
    const payload= JSON.parse(JSON.stringify(mockArrayHotels))
    const upDateHotels = {
      type: hotelsActionEnum.UP_DATE_HOTELS,
      payload
    }
    expect(hotelsActionCreators.UP_DATE_HOTELS(payload)).toEqual(upDateHotels)
  })
  it(`action creators UP_DATE_ONE_HOTEL`, ()=>{
    const payload= JSON.parse(JSON.stringify(mockOneHotel))
    const upDateHotels = {
      type: hotelsActionEnum.UP_DATE_ONE_HOTEL,
      payload
    }
    expect(hotelsActionCreators.UP_DATE_ONE_HOTEL(payload)).toEqual(upDateHotels)
  })
})

describe(`reducer hotels test`, ()=>{
  it(`action UP_DATE_IS_FAVORITE`, ()=>{
    const payload = {
      isFavorite: true,
      id: 1
    }
    const state = JSON.parse(JSON.stringify(mockArrayHotels))
    const outState = JSON.parse(JSON.stringify(mockArrayHotels))
    outState[1].is_favorite= true
    expect(hotels(state, hotelsActionCreators.UP_DATE_IS_FAVORITE(payload))).toEqual(outState)
    const payloadTwo = {
      isFavorite: true,
      id: 120
    }
    expect(hotels(state, hotelsActionCreators.UP_DATE_IS_FAVORITE(payloadTwo))).toEqual(state)
  })
  it(`action UP_DATE_HOTELS`, ()=>{
    const state:Array<Hotel> = []
    const payload = JSON.parse(JSON.stringify(mockArrayHotels))
    expect(hotels(state, hotelsActionCreators.UP_DATE_HOTELS(payload))).toEqual(payload)
    payload[0] = JSON.parse(JSON.stringify(mockOneHotel))
    const stateTwo = JSON.parse(JSON.stringify(mockArrayHotels))
    expect(hotels(stateTwo, hotelsActionCreators.UP_DATE_HOTELS(payload))).toEqual(payload)
  })
  it(`action UP_DATE_ONE_HOTEL`, ()=>{
    const state:Array<Hotel> = []
    const payload = JSON.parse(JSON.stringify(mockOneHotel))
    expect(hotels(state, hotelsActionCreators.UP_DATE_ONE_HOTEL(payload))).toEqual([payload])
    const stateTwo = JSON.parse(JSON.stringify(mockArrayHotels))
    expect(hotels(stateTwo, hotelsActionCreators.UP_DATE_ONE_HOTEL(payload))).toEqual([...stateTwo, payload])
    let stateThree = JSON.parse(JSON.stringify(mockArrayHotels))
    stateThree = [...stateThree, payload]
    const payloadTwo = JSON.parse(JSON.stringify(mockOneHotel))
    payloadTwo.is_favorite = true
    const outState = JSON.parse(JSON.stringify(stateThree))
    outState[outState.length-1] = payloadTwo
    expect(hotels(stateThree, hotelsActionCreators.UP_DATE_ONE_HOTEL(payloadTwo))).toEqual(outState)
  })
})
