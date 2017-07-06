import { Map, fromJS } from 'immutable'

import {
  LOAD_DATA_SUCCESS
} from './app'

import {
  ADD_LIKE,
  REMOVE_LIKE
} from './user'

const NOTIF_NEW_QUESTIONS = 'questions/NOTIF_NEW_QUESTIONS'
const SET_NOT_NEW_QUESTION = 'questions/SET_NOT_NEW_QUESTION'

const initialState = Map({
  questions: Map(),
  newQuestions: Map()
})

export function notifNewQuestions (result) {
  return (dispatch) => {
    dispatch({
      type: NOTIF_NEW_QUESTIONS,
      result
    })
  }
}

export function setNotNewQuestion (id) {
  return {
    type: SET_NOT_NEW_QUESTION,
    id
  }
}

export default function QuestionsReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS: {
      return state
              .set('questions', fromJS(action.result.questions))
    }
    case ADD_LIKE: {
      const count = state.getIn(['questions', action.id, 'likeCount'])
      return state
              .setIn(['questions', action.id, 'likeCount'], count + 1)
    }
    case REMOVE_LIKE: {
      const count = state.getIn(['questions', action.id, 'likeCount'])
      return state
              .setIn(['questions', action.id, 'likeCount'], count - 1 < 0 ? 0 : count - 1)
    }
    case NOTIF_NEW_QUESTIONS: {
      return state
              .set('newQuestions', fromJS(action.result))
    }
    case SET_NOT_NEW_QUESTION: {
      return state.deleteIn(['newQuestions', action.id])
    }
    default:
      return state
  }
}
