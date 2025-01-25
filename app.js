import config from './utils/config.js'
import express from 'express'
const app = express()
import cors from 'cors'
import mongoose from 'mongoose'
import notesRouter from './controllers/notes.js'
import middleware from './utils/middleware.js'
import logger from './utils/logging.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'

mongoose.set('strictQuery', false)

logger.info(`Connecting to... ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('Connect to MongoDB')
})
.catch(error => {
    logger.error(error)
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app