import {API} from "../../../utils/axios";
import MockAdapter from 'axios-mock-adapter';
import apiUri from '../../../api-uri'
import ErrorMessage from '../../../utils/error-message'
import {thunkHotelLoad} from "./hotels-up-date";
import {mockArrayHotels} from "../../../mock/mock-hotels";
import {hotelsActionCreators} from "../../reducer/types-action-creators/hotels";
import {appStateActionCreators} from "../../reducer/types-action-creators/app-state";

const apiMock = new MockAdapter(API);
jest.mock('../../../utils/error-message')

describe(`thunk hotelUpDate test`, ()=>{
  it(`thunkHotelLoad`, async ()=>{
    const hotelLoad = thunkHotelLoad()
    const dispatch = jest.fn()
    const hotels = JSON.parse(JSON.stringify(mockArrayHotels))
    const mockErrorMessage = ErrorMessage as jest.MockedFunction<typeof ErrorMessage>

    apiMock
      .onGet(apiUri.hotels())
      .reply(200, hotels)

    await hotelLoad(dispatch, ()=>hotels, undefined)
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, hotelsActionCreators.UP_DATE_HOTELS(hotels))
    expect(dispatch).toHaveBeenNthCalledWith(2, appStateActionCreators.LOAD(true))
    expect(mockErrorMessage).not.toBeCalled()
    dispatch.mockReset()

    apiMock
      .onGet(apiUri.hotels())
      .reply(404, [])

    await hotelLoad(dispatch, ()=>hotels, undefined)
    expect(dispatch).not.toBeCalled()
    expect(mockErrorMessage).toHaveBeenCalledTimes(1)
    mockErrorMessage.mockReset()
  })
})
