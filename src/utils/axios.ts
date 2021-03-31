import axios, { AxiosPromise } from 'axios';

export default (url: string): AxiosPromise => {
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
