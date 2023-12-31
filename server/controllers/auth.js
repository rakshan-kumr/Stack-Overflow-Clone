import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

import users from '../models/auth.js'

export const signup = async (req, res) => {
  const { name, email, password, browserDetails, os, deviceType } = req.body

  try {
    const existingUser = await users.findOne({ email })
    console.log('any existing user', existingUser)
    if (existingUser) {
      return res.status(404).json({ message: 'User already exist' })
    }
    console.log('continues...')
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
      loginHistory: [
        {
          systemInfo: {
            browserDetails,
            os,
            deviceType,
          },
          ipAddress: req.socket.remoteAddress,
        },
      ],
    })
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.SECRET_TOKEN,
      { expiresIn: '1h' }
    )
    res.status(200).json({ result: newUser, token })
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong')
  }
}

export const login = async (req, res) => {
  const { email, password, browserDetails, os, deviceType } = req.body

  console.log(req.body, req.socket.remoteAddress)

  try {
    const existingUser = await users.findOne({ email })
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist' })
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' })
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_TOKEN,
      { expiresIn: '1h' }
    )
    const authenticatedUser = await users.findByIdAndUpdate(
      existingUser._id,
      {
        $addToSet: {
          loginHistory: [
            {
              systemInfo: {
                browserDetails,
                os,
                deviceType,
              },
              ipAddress: req.socket.remoteAddress,
            },
          ],
        },
      },
      { new: true }
    )
    res.status(200).json({ result: authenticatedUser, token })
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong')
  }
}
