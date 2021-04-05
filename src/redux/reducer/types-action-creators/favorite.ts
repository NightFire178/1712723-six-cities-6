export type TFavorite = Array<number>

export const favoriteActionCreators = {
  UPDATE_FAVORITE: (payload:Array<number>):IupDateFavorite=>({type:favoriteActionEnum.UPDATE_FAVORITE, payload}),
  DEFAULT_FAVORITE: ():IDefaultFavorite=>({type:favoriteActionEnum.DEFAULT_FAVORITE}),
}

export enum favoriteActionEnum{
  UPDATE_FAVORITE= 'UPDATE_FAVORITE',
  DEFAULT_FAVORITE= 'DEFAULT_FAVORITE'
}

interface IupDateFavorite {
  type: favoriteActionEnum.UPDATE_FAVORITE,
  payload: Array<number>
}
interface IDefaultFavorite{
  type: favoriteActionEnum.DEFAULT_FAVORITE
}

export type favoriteActionTypes = IupDateFavorite | IDefaultFavorite
