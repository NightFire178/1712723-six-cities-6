import React from "react";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Home from "./components/home";
import CardProperty from "./components/card-property"
import Login from "./components/login"
import Favorites from "./components/favorites"

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/login" exact component={Login} />
				<Route path="/main/:city?" exact component={Home} />
				<Route path="/main/:city?" exact component={Favorites} />
				<Route path="/offer/:id?" exact component={CardProperty} />
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