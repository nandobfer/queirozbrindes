import axios from "axios"

export const url = "http://192.168.0.10"

export const api = axios.create({ baseURL: url + "/api" })