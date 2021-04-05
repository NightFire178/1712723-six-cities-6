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

export const appStateActionCreators = {
  SORT_SET: (payload:string):ISortSetAction =>({type:appStateActionEnum.SORT_SET, payload}),
  CITY_SET: (payload:string):ICitySetAction =>({type:appStateActionEnum.CITY_SET, payload}),
  AUTH_SET : (payload:isAuthType):IAuthSetAction =>({type:appStateActionEnum.AUTH_SET, payload}),
  LOG_OUT : ():ILogOutAction =>({type:appStateActionEnum.LOG_OUT}),
  LOAD :  (payload:boolean):ILoadAction =>({type:appStateActionEnum.LOAD, payload})
}

export enum appStateActionEnum {
  SORT_SET = 'SORT_SET',
  CITY_SET = 'CITY_SET',
  AUTH_SET = 'AUTH_SET',
  LOG_OUT = 'LOG_OUT',
  LOAD =  'LOAD'
}

interface ISortSetAction {
  type: appStateActionEnum.SORT_SET,
  payload: string
}

interface ICitySetAction {
  type: appStateActionEnum.CITY_SET,
  payload: string
}

interface IAuthSetAction {
  type: appStateActionEnum.AUTH_SET,
  payload: isAuthType
}

interface ILogOutAction {
  type:appStateActionEnum.LOG_OUT
}

interface ILoadAction {
  type: appStateActionEnum.LOAD,
  payload:boolean
}

export type appStateActionTypes =
  ISortSetAction|
  ICitySetAction|
  IAuthSetAction|
  ILogOutAction|
  ILoadAction
