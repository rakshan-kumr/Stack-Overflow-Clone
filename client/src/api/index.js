import axios from 'axios'

const baseURL = 'http://localhost:5000/'

const API = axios.create({ baseURL })

export const login = (authData) => API.post('user/login', authData)
export const signUp = (authData) => API.post('user/signup', authData)
