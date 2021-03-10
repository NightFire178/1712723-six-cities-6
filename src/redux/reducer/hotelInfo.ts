// TODO обновление списка отелей при формировании этой хрени

import comments from "../../template/comments"

type state = {
	id: number,
	nearbyID: Array<number>,
	comment: Array<comments>
}

export type hotelInfo = Array<state>

interface SystemActionTypes {
	type: string,
	payload: state
}

const hotelInfo = (state: hotelInfo = [], action: SystemActionTypes): hotelInfo => {
	switch (action.type) {
		case `SET_HOTEL_INFO`: 
			let temp = state.findIndex(obj => obj.id === action.payload.id)
			if (temp) {
				state[temp] = action.payload
				return state
			} else {
				return [...state, action.payload]
			}
		default:
			return state
	}
}

export default hotelInfo