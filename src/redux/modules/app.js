import { Map } from 'immutable';

import { REHYDRATE } from 'redux-persist/constants';
import { LOAD_TOPICS_SUCCESS } from './topics';
import { LOAD_QUESTIONS_SUCCESS } from './questions';

const initialState = Map({
  isRehydrated: false,
  topicsListening: false,
  questionsListening: false,
});

export default function Topicseducer(state = initialState, action = {}) {
  switch (action.type) {
    case REHYDRATE: {
      return state.set('isRehydrated', true);
    }
    case LOAD_TOPICS_SUCCESS: {
      return state.set('topicsListening', true);
    }
    case LOAD_QUESTIONS_SUCCESS: {
      return state.set('questionsListening', true);
    }
    default:
      return state;
  }
}
