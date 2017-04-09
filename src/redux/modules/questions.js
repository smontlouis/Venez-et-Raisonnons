import R from 'ramda'
import { Map, fromJS } from 'immutable'
import { firebaseDb } from '@src/services/firebase'
import {
  LOAD_DATA_SUCCESS,
  ADD_LIKE,
  REMOVE_LIKE,
} from './app'

const AppData = firebaseDb.ref('/')


const initialState = Map({
  questions: Map(),
})

export default function QuestionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS: {
      return state
              .update('questions', q => q.merge(fromJS(action.result.questions)))
    }
    case ADD_LIKE: {
      const count = state.getIn(['questions', action.id, 'likeCount'])
      AppData.update({ [`/questions/${action.id}/likeCount`]: count + 1 })
      return state
              .setIn(['questions', action.id, 'likeCount'], count + 1)
    }
    case REMOVE_LIKE: {
      const count = state.getIn(['questions', action.id, 'likeCount'])
      AppData.update({ [`/questions/${action.id}/likeCount`]: count - 1 < 0 ? 0 : count - 1 })
      return state
              .setIn(['questions', action.id, 'likeCount'], count - 1 < 0 ? 0 : count - 1)
    }
    default:
      return state
  }
}
