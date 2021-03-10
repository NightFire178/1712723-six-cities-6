import axios from "../../utils/axios"
import hotels from '../../template/hotel'

const getDate = (dispatch: any, getState: any = false) => {
	axios(`${process.env.SERVER_URL}/hotels`)
		.then(({ data }: { data: Array<hotels> }) => {
			if (!getState) {
				dispatch({ type: 'UPPDATE_HOTEL', payload: data })
				dispatch({ type: 'LOAD', payload: true })
			} else {
				// TODO test me
				if (JSON.stringify(getState().hotels) !== JSON.stringify(data)) {
					dispatch({ type: 'UPPDATE_HOTEL', payload: data })
				}
			}
		})
}

export const hotelsUpDate = ():any => (dispatch: any, getState: any) => {
	getDate(dispatch, getState)
}

export default ():any => (dispatch: any, getState: any) => {
	getDate(dispatch)
	setInterval(() => getDate(dispatch, getState), 60000)
}