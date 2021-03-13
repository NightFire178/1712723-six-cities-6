import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer/reducer'
import thunk from "redux-thunk"
import hotelsDownLoad from "./thunk/hotelsUpDate"
import hotelInfo from './thunk/hotelInfo'

const store: any = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(hotelsDownLoad())
export default store


