import axios from "axios";

export default async (url) => {
	return await axios(url, {
		withCredentials: true,
	})
}

