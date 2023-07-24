import mongoose from 'mongoose'
import Questions from '../models/questions.js'

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body
  console.log(req.body, noOfAnswers, answerBody, userAnswered, userId)

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Question unavailable.')
  }
  updateNoOfQuestions(_id, noOfAnswers)
  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(
      _id,
      {
        $addToSet: {
          answer: [
            {
              answerBody,
              userAnswered,
              userId,
            },
          ],
        },
      },
      { new: true }
    )

    res.status(200).json(updatedQuestion)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

const updateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: {
        noOfAnswers: noOfAnswers,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params
  const { answerId, noOfAnswers } = req.body
  console.log(req.body)

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Question unavailable.')
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send('Answer unavailable.')
  }
  updateNoOfQuestions(_id, noOfAnswers)

  try {
    await Questions.updateOne(
      { _id },
      {
        $pull: {
          answer: {
            _id: answerId,
          },
        },
      }
    )
  } catch (error) {
    res.status(405).json(error)
  }
}
