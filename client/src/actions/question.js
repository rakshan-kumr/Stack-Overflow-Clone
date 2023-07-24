import * as api from '../api/index.js'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData)
    console.log(questionData)
    dispatch({ type: 'POST_QUESTION', payload: data })
    dispatch(fetchAllQuestions())
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const fetchAllQuestions = () => async (dispatch) => {
  try {
    console.log('before fetching all the question in actions js file')
    const { data } = await api.getAllQuestions()
    console.log('fetching all the question in actions js file', data)
    dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    await api.deleteQuestion(id)
    dispatch(fetchAllQuestions())
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { userId, id, noOfAnswers, answerBody, userAnswered } = answerData
    const { data } = await api.postAnswer(
      userId,
      id,
      noOfAnswers,
      answerBody,
      userAnswered
    )
    dispatch({
      type: 'POST_ANSWER',
      payload: data,
    })
    dispatch(fetchAllQuestions())
  } catch (error) {
    console.log(error)
  }
}

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
  try {
    await api.deleteAnswer(id, answerId, noOfAnswers)
    dispatch(fetchAllQuestions())
  } catch (error) {
    console.log(error)
  }
}

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    await api.voteQuestion(id, value, userId)
    dispatch(fetchAllQuestions())
  } catch (error) {
    console.log(error)
  }
}
