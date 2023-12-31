import axios from 'axios'

const baseURL = 'https://stack-overflow-uppq.onrender.com/'

const API = axios.create({ baseURL })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('Profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('Profile')).token
    }`
  }
  return req
})

export const login = (authData) => API.post('user/login', authData)
export const signUp = (authData) => API.post('user/signup', authData)

export const postQuestion = (questionData) =>
  API.post('/question/Ask', questionData)
export const getAllQuestions = () => API.get('/question/get')
export const deleteQuestion = (id) => API.delete(`/question/delete/${id}`)
export const voteQuestion = (id, value, userId) =>
  API.patch(`/question/vote/${id}`, { value, userId })

export const postAnswer = (
  userId,
  id,
  noOfAnswers,
  answerBody,
  userAnswered
) => {
  return API.patch(`answer/post/${id}`, {
    userId,
    noOfAnswers,
    answerBody,
    userAnswered,
  })
}

export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`answer/delete/${id}`, { answerId, noOfAnswers })

export const fetchAllUsers = () => API.get('/user/getAllUsers')
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData)
