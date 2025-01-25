import express from 'express'
const usersRouter = express.Router()
import User from '../models/user.js'
import bcrypt from 'bcrypt'

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', { content: 1, important: 1})
    if(!users){
        response.status(404).end()
    }
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

export default usersRouter