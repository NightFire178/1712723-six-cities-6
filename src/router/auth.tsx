import React, {FunctionComponent} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom'
import appStateSelection from "../redux/selectors/app-state";

interface AuthRoute extends RouteProps {
  components: FunctionComponent
}

const auth: FunctionComponent<AuthRoute> = ({components: Component, ...rest}) => {
  const auth: boolean = appStateSelection.isAuth().now
  return <Route
    {...rest}
    render={
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props: React.ComponentProps<any>) => (auth ? <Component{...props}/> : <Redirect to={'/login'}/>)
    }/>
}

export default auth;
