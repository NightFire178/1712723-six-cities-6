import React, { FC } from "react";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Auth from "./auth"
import Home from "../components/home/home/home";
import CardProperty from "../components/card-property/card-property/card-property"
import Login from "../components/login/login"
import Favorites from "../components/favorites/favorites"
import useAppStateSelection from "../hooks/use-selectors-state/use-app-state";
import Loader from "../components/block/loader/loader";

const Router:FC = () => {
  const load = useAppStateSelection.load()
  if(!load){
    return <Loader/>
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/offer/:id?" exact component={CardProperty}/>
        <Auth path="/favorites" exact components={Favorites}/>
        <Route
          render={() => (
            <>
              <h1>
                404.
                <br/>
                <small>Page not found</small>
              </h1>
              <Link to="/">Go to main page</Link>
            </>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
