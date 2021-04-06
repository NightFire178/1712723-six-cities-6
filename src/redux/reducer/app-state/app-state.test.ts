import {
  appStateActionCreators,
  appStateActionEnum,
  appStateActionTypes, isAuthType
} from "../types-action-creators/app-state";
import {initialAppState, appState, defaultUserData} from "./app-state";
import mockUser from "../../../mock/mock-user"
import {SortName} from "../../../components/home/hotels/hotels";

describe(`action app-state creation test`, ()=>{
  it(`action creators SORT_SET `, ()=>{
    const payload = `Popular`
    const sortSetAction:appStateActionTypes = {
      type: appStateActionEnum.SORT_SET,
      payload
    }
    expect(appStateActionCreators.SORT_SET(payload)).toEqual(sortSetAction)
  })
  it(`action creators CITY_SET `, ()=>{
    const payload = `Amsterdam`
    const sortSetAction:appStateActionTypes = {
      type: appStateActionEnum.CITY_SET,
      payload
    }
    expect(appStateActionCreators.CITY_SET(payload)).toEqual(sortSetAction)
  })
  it(`action creators AUTH_SET `, ()=>{
    const payload:isAuthType = {
      now: true,
      user: mockUser
  }
    const sortSetAction:appStateActionTypes = {
      type: appStateActionEnum.AUTH_SET,
      payload
    }
    expect(appStateActionCreators.AUTH_SET(payload)).toEqual(sortSetAction)
  })
  it(`action creators LOG_OUT `, ()=>{
    const sortSetAction:appStateActionTypes = {
      type: appStateActionEnum.LOG_OUT
    }
    expect(appStateActionCreators.LOG_OUT()).toEqual(sortSetAction)
  })
  it(`action creators LOAD `, ()=>{
    const payload = true
    const sortSetAction:appStateActionTypes = {
      type: appStateActionEnum.LOAD,
      payload
    }
    expect(appStateActionCreators.LOAD(payload)).toEqual(sortSetAction)
  })
})

describe(`reducer appState test`,()=>{
  it(`action SORT_SET`, ()=>{
    const state = JSON.parse(JSON.stringify(initialAppState))
    const outState = JSON.parse(JSON.stringify(initialAppState))
    const payload = SortName.priceHighToLow
    outState.sort= SortName.priceHighToLow
    expect(appState(state, appStateActionCreators.SORT_SET(payload))).toEqual(outState)
  })
  it(`action CITY_SET`, ()=>{
    const state = JSON.parse(JSON.stringify(initialAppState))
    const outState = JSON.parse(JSON.stringify(initialAppState))
    const payload = `Amsterdam`
    outState.cityNow = `Amsterdam`
    expect(appState(state, appStateActionCreators.CITY_SET(payload))).toEqual(outState)
  })
  it(`action AUTH_SET`, ()=>{
    const state = JSON.parse(JSON.stringify(initialAppState))
    const outState = JSON.parse(JSON.stringify(initialAppState))
    const payload = `Amsterdam`
    outState.cityNow = `Amsterdam`
    expect(appState(state, appStateActionCreators.CITY_SET(payload))).toEqual(outState)
  })
  it(`action LOG_OUT`, ()=>{
    const state = JSON.parse(JSON.stringify(initialAppState))
    const outState = JSON.parse(JSON.stringify(initialAppState))
    state.isAuth = {
      now:true,
      user:mockUser
    }
    outState.isAuth = {
      now:false,
      user: defaultUserData
  }
    expect(appState(state, appStateActionCreators.LOG_OUT())).toEqual(outState)
  })
  it(`action LOAD`, ()=>{
    const state = JSON.parse(JSON.stringify(initialAppState))
    const outState = JSON.parse(JSON.stringify(initialAppState))
    const payload = true
    outState.load = true
    expect(appState(state, appStateActionCreators.LOAD(payload))).toEqual(outState)
  })
})
