import * as api from '../api'
import { setCurrentUser } from './currentUser'
import {
  browserName,
  deviceType,
  fullBrowserVersion,
  osName,
  osVersion,
} from 'react-device-detect'
import { fetchAllUsers } from './users'

export const signUp = (authData, navigate) => async (dispatch) => {
  const systemInfo = {
    browserDetails: `${browserName} ${fullBrowserVersion}`,
    os: `${osName} ${osVersion}`,
    deviceType: deviceType,
  }

  const updatedAuthData = { ...authData, ...systemInfo }

  try {
    const { data } = await api.signUp(updatedAuthData)
    dispatch({
      type: 'AUTH',
      data,
    })
    navigate('/')
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    dispatch(fetchAllUsers())
  } catch (error) {
    console.log(error)
  }
}
export const login = (authData, navigate) => async (dispatch) => {
  const systemInfo = {
    browserDetails: `${browserName} ${fullBrowserVersion}`,
    os: `${osName} ${osVersion}`,
    deviceType: deviceType,
  }
  const updatedAuthData = { ...authData, ...systemInfo }

  try {
    const { data } = await api.login(updatedAuthData)
    dispatch({
      type: 'AUTH',
      data,
    })
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}
