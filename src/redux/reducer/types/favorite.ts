export type TFavorite = Array<number>

export enum favoriteAction{
  UPDATE_FAVORITE= 'UPDATE_FAVORITE',
  DEFAULT_FAVORITE= 'DEFAULT_FAVORITE'
}

interface IupDateFavorite {
  type: favoriteAction.UPDATE_FAVORITE,
  payload: Array<number>
}
interface IDefaultFavorite{
  type: favoriteAction.DEFAULT_FAVORITE
}

export type favoriteActionTypes = IupDateFavorite | IDefaultFavorite
