import { combineReducers } from 'redux';
import hotels from "./hotels"
import appState from "./app-state"
import hotelInfo from "./hotel-info"
import favorite from "./favorite";

// FIXME устрой строгую типизацию  для начало подставь storeState в reducer, и веселись дорогой
const reducer = combineReducers({hotels, appState, hotelInfo, favorite})


export type StoreType = ReturnType<typeof reducer>
export default reducer
