import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer/reducer'
import thunk from "redux-thunk"
import hotelsDownLoad from "./thunk/hotelsUpDate"

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(hotelsDownLoad())

export default store


