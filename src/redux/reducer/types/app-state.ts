import IUser from '../../../types/user'

export type errorType = {
  message: string,
  now: boolean
}
export type isAuthType = {
  now: boolean,
  user: IUser
}

export interface IAppState{
  cityNow: string,
  isAuth: isAuthType,
  load: boolean,
  sort: string,
  error: errorType
}

export enum appStateAction {
  SET_ERROR = 'SET_ERROR',
  SORT_SET = 'SORT_SET',
  CITY_SET = 'CITY_SET',
  AUTH_SET = 'AUTH_SET',
  LOG_OUT = 'LOG_OUT',
  LOAD =  'LOAD'
}

interface ISetErrorAction {
  type:appStateAction.SET_ERROR,
  payload: errorType
}

interface  ISortSetAction {
  type: appStateAction.SORT_SET,
  payload: string
}

interface ICitySetAction {
  type: appStateAction.CITY_SET,
  payload: string
}

interface IAuthSetAction {
  type: appStateAction.AUTH_SET,
  payload: isAuthType
}

interface ILogOutAction {
  type:appStateAction.LOG_OUT
}

interface ILoadAction {
  type: appStateAction.LOAD,
  payload:boolean
}

export type appStateActionTypes =
  ISetErrorAction|
  ISortSetAction|
  ICitySetAction|
  IAuthSetAction|
  ILogOutAction|
  ILoadAction
