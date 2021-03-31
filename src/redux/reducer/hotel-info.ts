// TODO обновление списка отелей при формировании этой хрени
import {hotelInfoAction, hotelInfoActionTypes, THotelInfo} from "./types/hotel-info";

const hotelInfo = (state: THotelInfo = [], action: hotelInfoActionTypes): THotelInfo => {
	let temp
	switch (action.type) {
		case hotelInfoAction.SET_HOTEL_INFO:
			temp = state.findIndex(obj => obj.id === action.payload.id)
			if (temp>=0) {
				state[temp] = action.payload
				return state
			} else {
				return [...state, action.payload]
			}
		case hotelInfoAction.ADD_COMMENT:
			temp = state.findIndex(obj => obj.id === action.payload.id)
			if(temp>=0){
				state[temp].comment = action.payload.comments
				return state
			}
			return state
		default:
			return state
	}
}

export default hotelInfo
