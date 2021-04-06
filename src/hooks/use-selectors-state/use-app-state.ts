import {errorType, isAuthType} from "../../redux/reducer/types-action-creators/app-state";
import useTypedSelector from "../use-selector-type";

type IAppState={
  cityNow():string,
  isAuth(): isAuthType,
  load():boolean,
  sort():string,
  error(): errorType
}

const useAppStateSelection : IAppState ={
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


export default useAppStateSelection
