import express from 'express'
const loginRouter = express.Router()
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.find({ username })

    const passwordCorrect = user === null 
    ? false : await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect )) {
        return response.status(401).json({
            error: "invalid username or password"
        })
    }

    const userTaken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userTaken, process.env.SECRET)
    response
    .status(201)
    .send({ token, username: user.username, name: user.name})
})

export default loginRouter