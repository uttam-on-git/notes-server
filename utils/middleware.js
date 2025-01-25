import { response } from 'express'
import logger from './logging.js'

const requestLogger = (request, response, next) => {
    logger.info('METHOD:  ', request.method)
    logger.info('PATH:  ', request.path)
    logger.info('BODY:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    }
  
    next(error)
  }
  
export default {
    requestLogger,
    unknownEndpoint,
    errorHandler
  }