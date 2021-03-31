import {hotelInfoAction, hotelInfoActionTypes, THotelInfo} from "./types/hotel-info";

const hotelInfo = (state: THotelInfo = [], action: hotelInfoActionTypes): THotelInfo => {
	let tempIndex
	switch (action.type) {
		case hotelInfoAction.SET_HOTEL_INFO:
			tempIndex = state.findIndex(obj => obj.id === action.payload.id)
			if (tempIndex>=0) {
				state[tempIndex] = action.payload
				return state
			} else {
				return [...state, action.payload]
			}
		case hotelInfoAction.ADD_COMMENT:
			tempIndex = state.findIndex(obj => obj.id === action.payload.id)
			if(tempIndex>=0){
				state[tempIndex] = {...state[tempIndex], comment:action.payload.comments}
				return state
			}
			return state
		default:
			return state
	}
}

export default hotelInfo
