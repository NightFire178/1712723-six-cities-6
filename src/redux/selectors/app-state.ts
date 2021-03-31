import {errorType, isAuthType} from "../reducer/types/app-state";
import useTypedSelector from "../../hooks/use-selector-type";

type IAppState={
  cityNow():string,
  isAuth(): isAuthType,
  load():boolean,
  sort():string,
  error(): errorType
}

const appStateSelection : IAppState ={
  cityNow():string {
    return useTypedSelector(({appState})=>appState.cityNow)
  },
  isAuth(): isAuthType {
    return useTypedSelector(({appState})=>appState.isAuth)
  },
  load(): boolean {
    return useTypedSelector(({appState})=>appState.load)
  },
  sort(): string {
    return useTypedSelector(({appState})=>appState.sort)
  },
  error(): errorType {
    return useTypedSelector(({appState})=>appState.error)
  }
}


export default appStateSelection
