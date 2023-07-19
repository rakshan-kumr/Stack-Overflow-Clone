import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import upVote from '../../assets/sort-up.svg'
import downVote from '../../assets/sort-down.svg'
import './Questions.css'

const QuestionsDetails = () => {
  const { id } = useParams()
  var questionsList = [
    {
      _id: '1',
      upVotes: 3,
      downVotes: 2,
      noOfAnswers: 2,
      questionTitle: '1. What is a function?',
      questionBody: 'It meant to be',
      questionTags: ['java', 'node js', 'react js', 'mongoose'],
      userPosted: 'mano',
      userId: 2,
      askedOn: 'jan 1',
      answer: [
        {
          answerBody: 'Answer 1',
          userAnswered: 'Kumar',
          answeredOn: 'Jan 2',
          userId: 2,
        },
      ],
    },
    {
      _id: '2',
      upVotes: 3,
      downVotes: 2,
      no0fAnswers: 0,
      questionTitle: '2. What is a function?',
      questionBody: 'It meant to be',
      questionTags: ['javascript', 'R', 'python'],
      userPosted: 'mano',
      userId: 2,
      askedOn: 'jan 1',
      answer: [
        {
          answerBody: 'Answer 2',
          userAnswered: 'Kumar',
          answeredOn: 'Jan 12',
          userId: 1,
        },
      ],
    },
    {
      _id: '3',
      upVotes: 5,
      downVotes: 2,
      no0fAnswers: 0,
      questionTitle: '3. What is a function?',
      questionBody: 'It meant to be',
      questionTags: ['javascript', 'R', 'python'],
      userPosted: 'mano',
      userId: 1,
      askedOn: 'jan 1',
      answer: [
        {
          answerBody: 'Answer 3',
          userAnswered: 'Rakesh',
          answeredOn: 'Jan 21',
          userId: 3,
        },
      ],
    },
  ]

  const question = questionsList.find((question) => question._id === id)

  return (
    <div className='question-details-page'>
      <br />
      <br />
      {!question ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <section className='question-details-container'>
            <h1>{question.questionTitle}</h1>
            <div className='question-details-container-2'>
              <div className='question-votes'>
                <img src={upVote} alt='' width='18' />
                <p>{question.upVotes - question.downVotes}</p>
                <img src={downVote} alt='' width='18' />
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
                    <button type='button'>Share</button>
                    <button type='button'>Delete</button>
                  </div>
                  <div>
                    <p>asked {question.askedOn}</p>
                    <Link
                      to={`/User/${question.userId}`}
                      className='user-link'
                      style={{ color: '#0086d8' }}
                    >
                      <Avatar
                        backgroundColor='orange'
                        px='8px'
                        py='5px'
                        borderRadius='13%'
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
              <h3>{question.noOfAnswers} answers</h3>
              <DisplayAnswer key={question._id} question={question} />
            </section>
          )}
        </>
      )}
      <section className='post-ans-container'>
        <h3>Your Answer</h3>
        <form>
          <textarea name='' id='' cols='30' rows='10'></textarea>
          <br />
          <input
            type='submit'
            className='post-ans-btn'
            value='Post your answer'
          />
        </form>
        <p>
          Browse other questions tagged{' '}
          {question.questionTags.map((tag) => (
            <Link to='/Tags' key={tag}>
              {tag + ' '}
            </Link>
          ))}{' '}
          or{' '}
          <Link
            to='/AskQuestion'
            style={{ textDecoration: 'none', color: '#009dff' }}
          >
            ask your own question
          </Link>
        </p>
      </section>
    </div>
  )
}

export default QuestionsDetails
