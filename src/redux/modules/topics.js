import R from 'ramda';
import { Map, fromJS } from 'immutable';
import { LOAD_DATA_SUCCESS } from './app';

const initialState = Map({
  topics: Map(),
});

export default function TopicsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS: {
      const { topics: response } = action.result;
      // Here we're just adding id as a key (will be needed duh)
      const topics = R.mapObjIndexed((val, id) => ({ id, ...val }), response);
      return state
              .update('topics', t => t.merge(fromJS(topics)));
    }
    default:
      return state;
  }
}
