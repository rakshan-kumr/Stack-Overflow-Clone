import React from 'react'
import './HomeMainbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import QuestionsList from './QuestionsList'

const HomeMainbar = () => {
  var questionsList = [
    {
      id: 1,
      votes: 3,
      noOfAnswers: 2,
      questionTitle: '1. What is a function?',
      questionBody: 'It meant to be',
      questionTags: ['java', 'node js', 'react js', 'mongoose'],
      userPosted: 'mano',
      askedOn: 'jan 1',
    },
    {
      id: 2,
      votes: 0,
      no0fAnswers: 0,
      questionTitle: '2. What is a function?',
      questionBody: 'It meant to be',
      questionTags: ['javascript', 'R', 'python'],
      userPosted: 'mano',
      askedOn: 'jan 1',
    },
    {
      id: 3,
      votes: 1,
      no0fAnswers: 0,
      questionTitle: '3. What is a function?',
      questionBody: 'It meant to be',
      questionTags: ['javascript', 'R', 'python'],
      userPosted: 'mano',
      askedOn: 'jan 1',
    },
  ]

  const location = useLocation()
  const user = 1
  const navigate = useNavigate()

  const checkAuth = () => {
    if (user === null) {
      alert('Login or signup to ask questions')
      navigate('/Auth')
    } else navigate('/AskQuestion')
  }

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {location.pathname === '/' ? (
          <h1>Top Question</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button className='ask-btn' onClick={checkAuth}>
          Ask Question
        </button>
      </div>
      <div>
        {questionsList === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.length} questions</p>
            <>
              <QuestionsList questionsList={questionsList} />
            </>
          </>
        )}
      </div>
    </div>
  )
}

export default HomeMainbar
