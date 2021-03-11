import React from "react";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Home from "./components/home";
import CardProperty from "./components/card-property"
import Login from "./components/login"
import map from "./components/block/map" // FIXME

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/login" exact component={Login} />
				<Route path="/offer/:id?" exact component={CardProperty} />
				<Route path= "/map" exact component = {map}/> 
				<Route
					render={() => (
						<>
							<h1>
								404.
								<br />
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
