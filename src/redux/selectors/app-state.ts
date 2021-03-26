import {errorType, isAuthType} from "../reducer/types/app-state";
import useTypedSelector from "../../hooks/use-selector-type";

interface IAppState{
  cityNow():string,
  isAuth(): isAuthType,
  load():boolean,
  sort():string,
  error(): errorType
}

export default class appStateSelection implements IAppState{
  cityNow():string {
    return useTypedSelector(({appState})=>appState.cityNow)
  }
  isAuth(): isAuthType {
    return useTypedSelector(({appState})=>appState.isAuth)
  }
  load(): boolean {
    return useTypedSelector(({appState})=>appState.load)
  }
  sort(): string {
    return useTypedSelector(({appState})=>appState.sort)
  }
  error(): errorType {
    return useTypedSelector(({appState})=>appState.error)
  }
}


