import axios from "../../utils/axios"
import hotels from '../../template/hotel'
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"



export default (): ThunkAction<void, any, unknown, Action<string>> => (dispatch, getState) => {
	axios(`${process.env.SERVER_URL}/hotels`)
		.then(({ data }: { data: Array<hotels> }) => {
			if (JSON.stringify(getState().hotels) !== JSON.stringify(data)) {
				dispatch({ type: 'UPPDATE_HOTEL', payload: data })
				dispatch({ type: 'LOAD', payload: true })
			}
		})
}