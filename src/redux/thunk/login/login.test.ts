import {API} from "../../../utils/axios";
import MockAdapter from 'axios-mock-adapter';
import apiUri from '../../../api-uri'
import {thunkGetLogin, thunkPostLogin, thunkLogOut } from "./login";
import mockUser from "../../../mock/mock-user";
import {appStateActionCreators} from "../../reducer/types-action-creators/app-state";
import ErrorMessage from "../../../utils/error-message";
import {favoriteActionCreators} from "../../reducer/types-action-creators/favorite";


const apiMock = new MockAdapter(API);
jest.mock('../../../utils/error-message')

describe(`thunk login test`, ()=>{
  it(`thunkGetLogin`, async ()=>{
    const getLogin = thunkGetLogin()
    const data = JSON.parse(JSON.stringify(mockUser))
    const dispatch = jest.fn()

    apiMock
      .onGet(apiUri.login())
      .reply(200, data)

    await getLogin(dispatch, ()=>data, undefined)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appStateActionCreators.AUTH_SET({
      now:true,
      user:data
    }))
    dispatch.mockReset()

    apiMock
      .onGet(apiUri.login())
      .reply(404, [])

    await getLogin(dispatch, ()=>data, undefined)
    expect(dispatch).not.toBeCalled()
  })

  it(`thunkPostLogin`, async ()=>{
    const user = {
      email: `sfdsdjf@df.ru`,
      password: `password`
    }
    const postLogin = thunkPostLogin(user)
    const data = JSON.parse(JSON.stringify(mockUser))
    const dispatch = jest.fn()
    const mockErrorMessage = ErrorMessage as jest.MockedFunction<typeof ErrorMessage>

    apiMock
      .onPost(apiUri.login(), user)
      .reply(200, data)

    await postLogin(dispatch, ()=>data, undefined)
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, appStateActionCreators.AUTH_SET({
      now:true,
      user:data
    }))
    expect(mockErrorMessage).not.toBeCalled()
    dispatch.mockReset()
    mockErrorMessage.mockReset()

    apiMock
      .onPost(apiUri.login(), user)
      .reply(404, [])

    await postLogin(dispatch, ()=>data, undefined)
    expect(mockErrorMessage).toHaveBeenCalledTimes(1)
    expect(dispatch).not.toBeCalled()
    mockErrorMessage.mockReset()
  })

  it(`thunkLogOut`, async ()=>{
    const logOut = thunkLogOut()
    const dispatch = jest.fn()
    const data = JSON.parse(JSON.stringify(mockUser))
    const mockErrorMessage = ErrorMessage as jest.MockedFunction<typeof ErrorMessage>

    apiMock
      .onGet(apiUri.logOut())
      .reply(200)

    await logOut(dispatch, ()=>data, undefined)
    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, appStateActionCreators.LOG_OUT())
    expect(dispatch).toHaveBeenNthCalledWith(3, favoriteActionCreators.DEFAULT_FAVORITE())
    dispatch.mockReset()

    apiMock
      .onGet(apiUri.logOut())
      .reply(404)

    await logOut(dispatch, ()=>data, undefined)
    expect(dispatch).not.toBeCalled()
    expect(mockErrorMessage).toHaveBeenCalledTimes(1)
    expect(dispatch).not.toBeCalled()
    mockErrorMessage.mockReset()
  })
})
