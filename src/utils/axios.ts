import axios from "axios";
import hotel from "../template/hotel"
type obj = {
	data: Array<hotel>
}

export default async (url: string):Promise<obj> => {
	return await axios(url, {
		withCredentials: true,
	})
}

