import { Map, fromJS } from 'immutable';
import { Effects, loop } from 'redux-loop';
import { firebaseDb } from '../../services/firebase';

const Topics = firebaseDb.ref('topic');

const LOAD_TOPICS = 'topics/LOAD_TOPICS';
const LOAD_TOPICS_SUCCESS = 'topics/LOAD_TOPICS_SUCCESS';
const LOAD_TOPICS_FAIL = 'topics/LOAD_TOPICS_FAIL';

const initialState = Map({
  isLoading: false,
  topics: null,
});


export function loadTopicsSuccess(topics) {
  return {
    type: LOAD_TOPICS_SUCCESS,
    payload: topics,
  };
}

export function loadTopicsFail() {
  return {
    type: LOAD_TOPICS_FAIL,
  };
}

export function loadTopics() {
  return (dispatch) => {
    dispatch({
      type: LOAD_TOPICS,
    });

    Topics.on('value', (snapshot) => {
      dispatch(loadTopicsSuccess(snapshot.val()));
    });
  };
}

// function fetchTopics() {
//   return Topics.once('value')
//     .then(snapshot => snapshot.val())
//     .then(loadTopicsSuccess)
//     .catch(loadTopicsFail);
// }


export default function TopicsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_TOPICS: {
      return state.set('isLoading', true);
    }
    case LOAD_TOPICS_SUCCESS: {
      return state
              .set('isLoading', false)
              .set('topics', fromJS(action.payload));
    }

    case LOAD_TOPICS_FAIL: {
      return state.set('isLoading', false);
    }

    default:
      return state;
  }
}
