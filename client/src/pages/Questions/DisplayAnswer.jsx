import React from 'react'
import moment from 'moment'

import { Link, useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import { deleteAnswer } from '../../actions/question.js'
import { useDispatch, useSelector } from 'react-redux'

const DisplayAnswer = ({ question, handleShare }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const User = useSelector((state) => state.currentUserReducer)
  const handleAnsDelete = (ansId, noOfAnswers) => {
    dispatch(deleteAnswer(id, ansId, noOfAnswers - 1))
  }

  return (
    <div>
      {question.answer.map((ans) => (
        <div className='display-ans' key={ans._id}>
          <p>{ans.answerBody}</p>
          <div className='question-actions-user'>
            <div>
              <button type='button' onClick={handleShare}>
                Share
              </button>
              {User?.result?._id === ans?.userId && (
                <button
                  type='button'
                  onClick={() => handleAnsDelete(ans._id, question.noOfAnswers)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className='user-link'
                style={{ color: '#0086d8' }}
              >
                <Avatar
                  backgroundColor='green'
                  px='8px'
                  py='5px'
                  borderRadius='13%'
                >
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayAnswer
