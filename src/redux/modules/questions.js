import R from 'ramda';
import { Map, fromJS } from 'immutable';
import { LOAD_DATA_SUCCESS } from './app';

const initialState = Map({
  questions: Map(),
});

export default function QuestionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS: {
      // Here we're just adding id as a key (will be needed duh)
      const { questions: response } = action.result;
      const questions = R.mapObjIndexed((val, id) => ({ id, ...val }), response);
      return state
              .update('questions', q => q.merge(fromJS(questions)));
    }
    default:
      return state;
  }
}
