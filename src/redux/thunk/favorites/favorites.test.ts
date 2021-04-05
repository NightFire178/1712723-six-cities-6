import {API} from "../../../utils/axios";
import MockAdapter from 'axios-mock-adapter';
import apiUri from '../../../api-uri'
import ErrorMessage from '../../../utils/error-message'
import {mockArrayHotels} from "../../../mock/mock-hotels";
import Hotel from "../../../types/hotel";
import {thunkButtonFavorites, thunkFavorites} from "./favorites";
import {favoriteActionCreators} from "../../reducer/types-action-creators/favorite";
import {StoreType} from "../../reducer/reducer";
import {hotelsActionCreators} from "../../reducer/types-action-creators/hotels";

const apiMock = new MockAdapter(API);
jest.mock('../../../utils/error-message')

describe(`thunk favorites test`, ()=>{
  it(`thunkFavorites`, async ()=>{
    const mockErrorMessage = ErrorMessage as jest.MockedFunction<typeof ErrorMessage>
    const mockData = JSON.parse(JSON.stringify(mockArrayHotels))
    const res = mockData.map((obj:Hotel) => obj.id)
    const dispatch = jest.fn()
    const favorites = thunkFavorites()

    apiMock
      .onGet(apiUri.favorite())
      .reply(200, mockData)

    await favorites(dispatch, ()=>mockData, undefined)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, favoriteActionCreators.UPDATE_FAVORITE(res))
    dispatch.mockReset()

    apiMock
      .onGet(apiUri.favorite())
      .reply(404, mockData)

    await favorites(dispatch, ()=>mockData, undefined)
    expect(dispatch).not.toBeCalled()
    expect(mockErrorMessage).toHaveBeenCalledTimes(1)
    mockErrorMessage.mockReset()
  })

  it(`thunkButtonFavorites`, async ()=>{
    const mockErrorMessage = ErrorMessage as jest.MockedFunction<typeof ErrorMessage>
    const mockData = JSON.parse(JSON.stringify(mockArrayHotels))
    const dispatch = jest.fn()
    const stateId = 0
    const id = mockData[stateId].id
    const is_favorite = !mockData[stateId].is_favorite
    mockData[stateId].is_favorite = is_favorite
    // eslint-disable-next-line
    // @ts-ignore
    const getState = ():StoreType =>({
      hotels: JSON.parse(JSON.stringify(mockArrayHotels))
    })
    const favorites = thunkButtonFavorites(id)

    apiMock
      .onPost(apiUri.favoriteIdStatus(id, is_favorite), {})
      .reply(200, mockData)

    await favorites(dispatch, getState , undefined)
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(2, hotelsActionCreators.UP_DATE_IS_FAVORITE({
      isFavorite: is_favorite,
      id: stateId
    }))
    expect(mockErrorMessage).not.toBeCalled()
    dispatch.mockReset()

    apiMock
      .onPost(apiUri.favoriteIdStatus(id, is_favorite), {})
      .reply(404, mockData)

    await favorites(dispatch, getState , undefined)
    expect(dispatch).not.toBeCalled()
    expect(mockErrorMessage).toHaveBeenCalledTimes(1)
    mockErrorMessage.mockReset()
  })
})
