import { combineReducers } from 'redux'

import questions from './questions'
import topics from './topics'
import auth from './auth'
import app from './app'
import search from './search'

export default combineReducers({
  app,
  topics,
  questions,
  auth,
  search,
})
