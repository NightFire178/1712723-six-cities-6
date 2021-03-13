// TODO обновление списка отелей при формировании этой хрени

import comments from "../../template/comment"

type state = {
	id: number,
	nearbyID: Array<number>,
	comment: Array<comments>
}

export type hotelInfo = Array<state>

interface SystemActionTypes {
	type: string,
	payload: state&{id:number, comments:Array<comments>}
}

const hotelInfo = (state: hotelInfo = [], {type, payload}: SystemActionTypes): hotelInfo => {
	let temp
	switch (type) {
		case `SET_HOTEL_INFO`: 
			temp = state.findIndex(obj => obj.id === payload.id)
			if (temp>=0) {
				state[temp] = payload
				return state
			} else {
				return [...state, payload]
			}
		case `ADD_COMMENT`:
			temp = state.findIndex(obj => obj.id === payload.id)
			if(temp>=0){
				state[temp].comment = payload.comments
				return state
			} else{
				return state
			}
			
		default:
			return state
	}
}

export default hotelInfo