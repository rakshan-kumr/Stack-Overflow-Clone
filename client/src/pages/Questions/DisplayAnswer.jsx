import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import { deleteAnswer } from '../../actions/question.js'
import { useDispatch, useSelector } from 'react-redux'

const DisplayAnswer = ({ question }) => {
  const { id } = useParams()

  const User = useSelector((state) => state.currentUserReducer)
  const dispatch = useDispatch()
  const handleAnsDelete = (ansId, noOfAnswers) => {
    console.log('answer delete triggered')
    dispatch(deleteAnswer(id, ansId, noOfAnswers))
  }

  return (
    <div>
      {question.answer.map((ans) => (
        <div className='display-ans' key={ans._id}>
          <p>{ans.answerBody}</p>
          <div className='question-actions-user'>
            <div>
              <button type='button'>Share</button>
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
              <p>answered on {ans.answeredOn}</p>
              <Link
                to={`/User/${ans.userId}`}
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
