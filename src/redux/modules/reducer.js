import { combineReducers } from 'redux-loop'
import { routerReducer } from 'react-router-redux'

import questions from './questions'
import topics from './topics'
import auth from './auth'
import app from './app'
import search from './search'

export default combineReducers({
  routing: routerReducer,
  app,
  topics,
  questions,
  auth,
  search,
})
