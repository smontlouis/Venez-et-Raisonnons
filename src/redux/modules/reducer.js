import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import topics from './topics';
import auth from './auth';
import app from './app';

export default combineReducers({
  routing: routerReducer,
  app,
  topics,
  auth,
});
