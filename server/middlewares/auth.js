import 'dotenv/config'
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1].trim()
    let decodeData = jwt.verify(token, process.env.SECRET_TOKEN)
    req.userId = decodeData?.id
    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth
