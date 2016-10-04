
import R from 'ramda';
import { Map, fromJS } from 'immutable';
import { firebaseDb } from '../../services/firebase';

const Questions = firebaseDb.ref('question');

const LOAD_QUESTIONS = 'questions/LOAD_QUESTIONS';
export const LOAD_QUESTIONS_SUCCESS = 'questions/LOAD_QUESTIONS_SUCCESS';
const LOAD_QUESTIONS_FAIL = 'questions/LOAD_QUESTIONS_FAIL';

const initialState = Map({
  isLoading: false,
  questions: Map(),
});


export function loadQuestionsSuccess(questions, topicId) {
  return {
    type: LOAD_QUESTIONS_SUCCESS,
    questions,
    topicId,
  };
}

export function loadQuestionsFail() {
  return {
    type: LOAD_QUESTIONS_FAIL,
  };
}

export function loadQuestions(topicId) {
  return (dispatch) => {
    dispatch({
      type: LOAD_QUESTIONS,
    });

    Questions.orderByChild('topic').equalTo(topicId).on('value', (snapshot) => {
      dispatch(loadQuestionsSuccess(snapshot.val(), topicId));
    });
  };
}


export default function QuestionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_QUESTIONS: {
      return state.set('isLoading', true);
    }
    case LOAD_QUESTIONS_SUCCESS: {
      // Here we're just adding id as a key (will be needed duh)
      const questions = R.mapObjIndexed((val, id) => ({ id, ...val }), action.questions);
      return state
              .set('isLoading', false)
              .update('questions', q => q.merge(fromJS(questions)));
    }

    case LOAD_QUESTIONS_FAIL: {
      return state.set('isLoading', false);
    }

    default:
      return state;
  }
}
