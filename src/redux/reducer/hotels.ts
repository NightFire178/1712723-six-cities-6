import Hotel from "../../template/hotel"

interface SystemActionTypes {
	type: string,
	payload: Array<Hotel>
}

export type hotels = Array<Hotel>

const initialState: hotels = []

function hotels(state = initialState, action: SystemActionTypes): hotels {
switch (action.type) {
		case 'UPPDATE_HOTEL':
			state = action.payload
			return state;
		default:
			return state;
	}
}

export default hotels