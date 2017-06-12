import { combineReducers } from 'redux-immutable'

import questions from './questions'
import topics from './topics'
import studies from './studies'
import auth from './auth'
import app from './app'
import search from './search'
import bible from './bible'

export default combineReducers({
  app,
  topics,
  questions,
  studies,
  auth,
  search,
  bible
})
