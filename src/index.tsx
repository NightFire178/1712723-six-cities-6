import React from "react"
import ReactDom from "react-dom"
import Router from "./router"
import { Provider } from "react-redux"
import store from "./redux/store"


ReactDom.render(
	<Provider store={store}>
		<Router />
	</Provider>,
	document.getElementById(`root`)
)
