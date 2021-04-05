import axios from "axios";

const REQUEST_TIMEOUT = 5000;

export const API = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT
})
