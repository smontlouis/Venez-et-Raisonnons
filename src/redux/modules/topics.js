import R from 'ramda';
import { Map, fromJS } from 'immutable';
import { firebaseDb } from '../../services/firebase';

const Topics = firebaseDb.ref('topic');

const LOAD_TOPICS = 'topics/LOAD_TOPICS';
export const LOAD_TOPICS_SUCCESS = 'topics/LOAD_TOPICS_SUCCESS';
const LOAD_TOPICS_FAIL = 'topics/LOAD_TOPICS_FAIL';

const initialState = Map({
  isLoading: false,
  topics: Map(),
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


export default function TopicsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_TOPICS: {
      return state.set('isLoading', true);
    }
    case LOAD_TOPICS_SUCCESS: {
      const topics = R.mapObjIndexed((val, id) => ({ id, ...val }), action.payload);// add id as key
      return state
              .set('isLoading', false)
              .update('topics', t => t.merge(fromJS(topics)));
    }

    case LOAD_TOPICS_FAIL: {
      return state.set('isLoading', false);
    }

    default:
      return state;
  }
}
