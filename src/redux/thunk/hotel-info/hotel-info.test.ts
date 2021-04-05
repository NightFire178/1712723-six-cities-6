import {API} from "../../../utils/axios";
import MockAdapter from 'axios-mock-adapter';
import apiUri from '../../../api-uri'
import ErrorMessage from '../../../utils/error-message'
import {StoreType} from "../../reducer/reducer";
import {thunkHotelInfo} from "./hotel-info"
import {mockArrayHotels} from "../../../mock/mock-hotels";
import {mockArrayComments} from "../../../mock/mock-comment";
import {hotelsActionCreators} from "../../reducer/types-action-creators/hotels";
import {hotelInfoActionCreators} from "../../reducer/types-action-creators/hotel-info";

const apiMock = new MockAdapter(API);
jest.mock('../../../utils/error-message')

describe(`thunk hotel-info test`, ()=>{
  it(`thunkHotelInfo`, async ()=>{
    const mockErrorMessage = ErrorMessage as jest.MockedFunction<typeof ErrorMessage>
    // eslint-disable-next-line
    // @ts-ignore
    const getState = ():StoreType=>({
      hotelInfo: []
    })
    const dispatch = jest.fn()
    const mockHotels = JSON.parse(JSON.stringify(mockArrayHotels))
    const stateIndex = 0
    const id = mockHotels[stateIndex].id
    const mockComments = JSON.parse(JSON.stringify(mockArrayComments))
    const hotelInfo = thunkHotelInfo(id)
    const nearby = [mockHotels[1], mockHotels[2], mockHotels[3]]

    apiMock
      .onGet(apiUri.hotelsId(id))
      .reply(200, mockHotels[stateIndex])

    apiMock
      .onGet(apiUri.comments(id))
      .reply(200, mockComments)

    apiMock
      .onGet(apiUri.hotelsIdNearby(id))
      .reply(200, nearby)

    expect(await hotelInfo(dispatch, getState, undefined )).toEqual(200)
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, hotelsActionCreators.UP_DATE_ONE_HOTEL(mockHotels[stateIndex]))
    expect(dispatch).toHaveBeenNthCalledWith(2, hotelInfoActionCreators.SET_HOTEL_INFO({
      id,
      nearbyID:[nearby[0].id, nearby[1].id, nearby[2].id],
      comment: mockComments,
    }))
    expect(mockErrorMessage).not.toBeCalled()
    dispatch.mockReset()
    mockErrorMessage.mockReset()

    apiMock
      .onGet(apiUri.hotelsId(id))
      .networkError()

    expect(await hotelInfo(dispatch, getState, undefined )).toEqual(404)
    expect(dispatch).not.toBeCalled()
    expect(mockErrorMessage).toHaveBeenCalledTimes(1)
    mockErrorMessage.mockReset()

    apiMock
      .onGet(apiUri.hotelsId(id))
      .reply(404, {})

    expect(await hotelInfo(dispatch, getState, undefined )).toEqual(204)
    expect(dispatch).not.toBeCalled()
    expect(mockErrorMessage).not.toBeCalled()
    mockErrorMessage.mockReset()
  })
})
