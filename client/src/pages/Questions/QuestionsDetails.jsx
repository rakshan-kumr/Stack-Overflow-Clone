import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import moment from 'moment'
import upVote from '../../assets/sort-up.svg'
import downVote from '../../assets/sort-down.svg'
import './Questions.css'
import { useDispatch, useSelector } from 'react-redux'
import { postAnswer } from '../../actions/question.js'

const QuestionsDetails = () => {
  const dispatch = useDispatch()
  const questionsListObject = useSelector((state) => state.questionsReducer)
  const User = useSelector((state) => state.currentUserReducer)
  const { id } = useParams()

  const navigate = useNavigate()
  const [answer, setAnswer] = useState('')
  const questionsList = questionsListObject

  // const question = questionsListObject.data.find(
  //   (question) => question._id === id
  // )

  const handleUpVote = () => {
    return
  }
  const handleDownVote = () => {
    return
  }
  const handleShare = () => {
    return
  }
  const handleDelete = () => {
    return
  }

  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault()
    console.log(answerLength)
    if (User === null) {
      alert('Login or Signup to answer a questions')
      navigate('/Auth')
    } else {
      if (answer === '') {
        alert('Enter an answer before submitting')
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: answer,
            userAnswered: User.result.name,
          })
        )
        console.log('Just before setAnswer')
      }
    }
    setAnswer('')
  }
  return (
    <div className='question-details-page'>
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className='question-details-container'>
                  <h1>{question.questionTitle}</h1>
                  <div className='question-details-container-2'>
                    <div className='question-votes'>
                      <img
                        src={upVote}
                        alt=''
                        width='18'
                        className='votes-icon'
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downVote}
                        alt=''
                        width='18'
                        className='votes-icon'
                        onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <p className='question-body'>{question.questionBody}</p>
                      <div className='question-details-tags'>
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className='question-actions-user'>
                        <div>
                          <button type='button' onClick={handleShare}>
                            Share
                          </button>
                          {User?.result?._id === question?.userId && (
                            <button type='button' onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className='user-link'
                            style={{ color: '#0086d8' }}
                          >
                            <Avatar
                              backgroundColor='orange'
                              px='8px'
                              py='5px'
                              borderRadius='4px'
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className='post-ans-container'>
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAnswer(e, question.answer.length)
                    }}
                  >
                    <textarea
                      name=''
                      id=''
                      cols='30'
                      rows='10'
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type='submit'
                      className='post-ans-btn'
                      value='Post Your Answer'
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to='/Tags' key={tag} className='ans-tags'>
                        {' '}
                        {tag}{' '}
                      </Link>
                    ))}{' '}
                    or
                    <Link
                      to='/AskQuestion'
                      style={{ textDecoration: 'none', color: '#009dff' }}
                    >
                      {' '}
                      ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  )
}

export default QuestionsDetails
