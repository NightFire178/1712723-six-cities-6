export type TFavorite = Array<number>

export enum favoriteAction{
  UPDATE_FAVORITE= 'UPDATE_FAVORITE'
}

interface IupDateFavorite {
  type: string,
  payload: Array<number>
}

export type favoriteActionTypes = IupDateFavorite
