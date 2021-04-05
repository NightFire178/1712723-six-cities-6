import {
  hotelInfoActionCreators,
  hotelInfoActionEnum,
  IInfoState,
  THotelInfo
} from "../types-action-creators/hotel-info";
import mockComment, {mockArrayComments} from "../../../mock/mock-comment";
import hotelInfo from "./hotel-info";


describe(`action hotelInfo creation`, ()=>{
  it(`action SET_HOTEL_INFO`,()=>{
    const payload = {
      id:5,
      nearbyID: [2, 5, 7],
      comment:mockArrayComments
    }
    const setHotelInfo = {
      type:hotelInfoActionEnum.SET_HOTEL_INFO,
      payload
    }
    expect(hotelInfoActionCreators.SET_HOTEL_INFO(payload)).toEqual(setHotelInfo)
  })
  it(`action ADD_COMMENT`,()=>{
    const payload = {
      id:5,
      comments:mockArrayComments
    }
    const setHotelInfo = {
      type:hotelInfoActionEnum.ADD_COMMENT,
      payload
    }
    expect(hotelInfoActionCreators.ADD_COMMENT(payload)).toEqual(setHotelInfo)
  })
})


describe(`reducer hotel-info test`, ()=>{
  it(`action SET_HOTEL_INFO`, ()=>{
    const payloadOne:IInfoState = {
      id:5,
      nearbyID: [2, 5, 7],
      comment:mockArrayComments
    }
    const state = [{
      id:4,
      nearbyID: [3,5,8],
      comment: mockArrayComments
    }, {
      id:2,
      nearbyID: [5,1,4],
      comment: mockArrayComments
    }]
    const outStateOne = [...state, payloadOne]
    expect(hotelInfo(state, hotelInfoActionCreators.SET_HOTEL_INFO(payloadOne))).toEqual(outStateOne)
    const payloadTwo:IInfoState = {
      id:4,
      nearbyID: [2, 5, 7],
      comment:[mockComment]
    }
    const outStateTwo = JSON.parse(JSON.stringify(state))
    outStateTwo[0] = payloadTwo
    expect(hotelInfo(state, hotelInfoActionCreators.SET_HOTEL_INFO(payloadTwo))).toEqual(outStateTwo)
    const stateTwo:THotelInfo = []
    const outStateThree = [payloadOne]
    expect(hotelInfo(stateTwo, hotelInfoActionCreators.SET_HOTEL_INFO(payloadOne))).toEqual(outStateThree)
  })
  it(`action ADD_COMMENT`, ()=>{
    const state = [{
      id:4,
      nearbyID: [3,5,8],
      comment: mockArrayComments
    }, {
      id:2,
      nearbyID: [5,1,4],
      comment: mockArrayComments
    }]
    const payload ={
      id:2,
      comments:[mockComment, mockComment]
    }
    const outState = JSON.parse(JSON.stringify(state))
    outState[1].comment= payload.comments
    expect(hotelInfo(state, hotelInfoActionCreators.ADD_COMMENT(payload))).toEqual(outState)
    const outStateTwo = JSON.parse(JSON.stringify(state))
    payload.id = 10
    expect(hotelInfo(state, hotelInfoActionCreators.ADD_COMMENT(payload))).toEqual(outStateTwo)
  })
})
