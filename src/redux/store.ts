import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer/reducer'
import thunk from "redux-thunk"
import hotelsDownLoad from "./thunk/hotelsUpDate"
import {getLogin} from "./thunk/login";

const store: any = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(getLogin())
store.dispatch(hotelsDownLoad())
export default store


