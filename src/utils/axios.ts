import axios from "axios";

// TODO mentor
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (url: string): Promise<any> => {
	return axios(url, {
		withCredentials: true,
    timeout: 5000
	})
}

export const API = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
  timeout: 5000
})
