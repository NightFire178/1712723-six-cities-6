import {API} from "../../../utils/axios";
import MockAdapter from 'axios-mock-adapter';
import {mockArrayComments} from "../../../mock/mock-comment";
import {thunkGetComments, thunkPostComment} from './comments'
import apiUri from '../../../api-uri'
import ErrorMessage from '../../../utils/error-message'
import {hotelInfoActionCreators} from "../../reducer/types-action-creators/hotel-info";
import {IPostComment} from "../../../types/comment";

const apiMock = new MockAdapter(API);
jest.mock('../../../utils/error-message')

describe(`thunk comments test`, ()=>{
  it(`thunkGetComments`, async ()=>{
    const mockErrorMessage = ErrorMessage as jest.MockedFunction<typeof ErrorMessage>
    const data = JSON.parse(JSON.stringify(mockArrayComments))
    const id = 10
    const dispatch = jest.fn()
    const getComments = thunkGetComments(id)

    apiMock
      .onGet(apiUri.comments(id))
      .reply(200, data)

    await getComments(dispatch, ()=>data, undefined)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, hotelInfoActionCreators.ADD_COMMENT({id, comments:data}))
    expect(mockErrorMessage).not.toBeCalled()
    dispatch.mockReset()

    apiMock
      .onGet(apiUri.comments(id))
      .reply(404, [])

    await getComments(dispatch, ()=>data, undefined)
    expect(dispatch).not.toBeCalled()
    expect(mockErrorMessage).toHaveBeenCalledTimes(1)
    mockErrorMessage.mockReset()
  })
  it(`thunkPostComments`, async ()=>{
    const mockErrorMessage = ErrorMessage as jest.MockedFunction<typeof ErrorMessage>
    const data = JSON.parse(JSON.stringify(mockArrayComments))
    const comment:IPostComment = {
      comment: `Beautiful space, fantastic location and atmosphere,
       really a wonderful place to spend a few days. Will be back.`,
      rating: 4
    }
    const id = 10
    const dispatch = jest.fn()
    const postComments = thunkPostComment(id, comment)

    apiMock
      .onPost(apiUri.comments(id), comment)
      .reply(200, data)

    expect(await postComments(dispatch, ()=>data, undefined)).toEqual(true)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenNthCalledWith(1, hotelInfoActionCreators.ADD_COMMENT({id, comments:data}))
    expect(mockErrorMessage).not.toBeCalled()
    dispatch.mockReset()

    apiMock
      .onPost(apiUri.comments(id), comment)
      .reply(404, [])

    expect(await postComments(dispatch, ()=>data, undefined)).toEqual(false)
    expect(dispatch).not.toBeCalled()
    expect(mockErrorMessage).toHaveBeenCalledTimes(1)
    mockErrorMessage.mockReset()
  })
})
