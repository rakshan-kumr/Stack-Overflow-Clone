import React from 'react'
import Questions from './Questions'

const QuestionsList = ({ questionsList }) => {
  return (
    questionsList && (
      <>
        {questionsList.map((question) => (
          <Questions key={question._id} question={question} />
        ))}
      </>
    )
  )
}

export default QuestionsList
