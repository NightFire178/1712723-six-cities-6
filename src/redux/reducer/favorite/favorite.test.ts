import {favoriteActionCreators, favoriteActionEnum, favoriteActionTypes} from "../types-action-creators/favorite";
import favorite from "./favorite";

describe(`action favorite creation`, ()=>{
  it(`action creators UPDATE_FAVORITE`, ()=>{
    const payload = [2, 4, 6, 8]
    const updateFavoriteState:favoriteActionTypes = {
      type: favoriteActionEnum.UPDATE_FAVORITE,
      payload
    }
    expect(favoriteActionCreators.UPDATE_FAVORITE(payload)).toEqual(updateFavoriteState)
  })
  it(`action creators DEFAULT_FAVORITE`, ()=>{
    const updateFavoriteState:favoriteActionTypes = {
      type: favoriteActionEnum.DEFAULT_FAVORITE
    }
    expect(favoriteActionCreators.DEFAULT_FAVORITE()).toEqual(updateFavoriteState)
  })
})

describe(`reducer favorites test`, ()=>{
  it(`action UPDATE_FAVORITE`, ()=>{
    const payload = [2, 5, 7, 8, 10]
    const state:Array<number> = []
    const outState = payload.slice()
    expect(favorite(state, favoriteActionCreators.UPDATE_FAVORITE(payload))).toEqual(outState)
  })
  it(`action DEFAULT_FAVORITE`, ()=>{
    const state:Array<number> = [2, 5, 7, 8, 10]
    const outState:Array<number> = []
    expect(favorite(state, favoriteActionCreators.DEFAULT_FAVORITE())).toEqual(outState)
  })
})
