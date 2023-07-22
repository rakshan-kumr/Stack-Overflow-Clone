import React, { useState } from 'react'
import './AskQuestion.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [questionTags, setQuestionTags] = useState(null)

  const dispatch = useDispatch()
  const User = useSelector((state) => state.currentUserReducer)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log({ questionTitle, questionBody, questionTag })
    console.log(questionTags)
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          questionTags,
          userPosted: User.result.name,
        },
        navigate
      )
    )
  }

  return (
    <div className='ask-question'>
      <div className='ask-ques-container'>
        <br />
        <h1>Ask a public question</h1>
        <h2>{questionBody}</h2>
        <form onSubmit={handleSubmit}>
          <div className='ask-form-container'>
            <label htmlFor='ask-ques-title'>
              <h4>Title</h4>
              <p>
                Be specific and imagine you're asking a question to another
                person
              </p>
              <input
                type='text'
                id='ask-ques-title'
                placeholder='e.g. Is there an R function in ...'
                onChange={(e) => setQuestionTitle(e.target.value)}
              />
            </label>
            <label htmlFor='ask-ques-body'>
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer the
                question
              </p>
              <textarea
                type='text'
                id='ask-ques-body'
                cols='30'
                rows='10'
                onChange={(e) => setQuestionBody(e.target.value)}
              />
            </label>
            <label htmlFor='ask-ques-tags'>
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type='text'
                id='ask-ques-tags'
                placeholder='e.g. (xml typescript wordpress)'
                onChange={(e) => setQuestionTags(e.target.value.split(' '))}
              />
            </label>
          </div>
          <input
            type='submit'
            value='Review your question'
            className='review-btn'
          />
        </form>
      </div>
    </div>
  )
}

export default AskQuestion
