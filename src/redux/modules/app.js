import { Map, fromJS } from 'immutable';

import { REHYDRATE } from 'redux-persist/constants';
import { LOAD_TOPICS_SUCCESS } from './topics';
import { LOAD_QUESTIONS_SUCCESS } from './questions';

const initialState = Map({
  isRehydrated: false,

  /*
    I could have put those boolean listeners in their own respective reducers.
    But because I'm using redux persist and that I'm not able for now to disallow
    persist storage for a subState (redux-persist-transform-filter don't work
    with immutable Data and I'm too lazy to know why), I'm just putting this here
    and I added this whole reducer as blacklisted by redux-persist.
    I don't want the app to listen multiple times firebase, so I've made this.
  */
  hasTopicsListening: false,
  hasQuestionsByTopicListening: Map(),
});

export default function Topicseducer(state = initialState, action = {}) {
  switch (action.type) {
    case REHYDRATE: {
      return state.set('isRehydrated', true);
    }
    case LOAD_TOPICS_SUCCESS: {
      return state.set('hasTopicsListening', true);
    }
    case LOAD_QUESTIONS_SUCCESS: {
      return state.update('hasQuestionsByTopicListening', h => h.merge(fromJS({ [action.topicId]: true })));
    }
    default:
      return state;
  }
}
