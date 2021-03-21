import React, {FunctionComponent} from 'react';
import {useSelector} from "react-redux"
import {Route, Redirect, RouteProps} from 'react-router-dom'
import {storeState} from "../redux/reducer/reducer";

interface AuthRoute extends RouteProps {
  components: any
}

const auth: FunctionComponent<AuthRoute> = ({components: Component, ...rest}) => {
  const auth: boolean = useSelector((state: storeState) => state.appState.isAuth.now)
  return <Route
    {...rest}
    render={
      (props: any) => (auth ? <Component{...props}/> : <Redirect to={'/login'}/>)
    }/>
}

export default auth;
