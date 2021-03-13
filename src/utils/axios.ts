import axios from "axios";

export default (url: string): Promise<any> => {
	return axios(url, {
		withCredentials: true,
    timeout: 5000
	})
}

