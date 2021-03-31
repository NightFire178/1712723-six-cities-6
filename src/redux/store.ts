import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducer/reducer'
import thunk from "redux-thunk"
import hotelsDownLoad from "./thunk/hotels-up-date"
import {thunkGetLogin} from "./thunk/login";

const store: any = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(thunkGetLogin())
store.dispatch(hotelsDownLoad())
export default store
