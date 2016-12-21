import { Map, List } from 'immutable'
import { firebaseDb } from '../../services/firebase'

const LOAD_DATA = 'app/LOAD_DATA'
export const LOAD_DATA_SUCCESS = 'app/LOAD_DATA_SUCCESS'
// const LOAD_DATA_FAIL = 'app/LOAD_DATA_FAIL'
const ADD_FAVORITE = 'app/ADD_FAVORITE'
const REMOVE_FAVORITE = 'app/REMOVE_FAVORITE'
export const ADD_LIKE = 'app/ADD_LIKE'
export const REMOVE_LIKE = 'app/REMOVE_LIKE'

const AppData = firebaseDb.ref('/')

const initialState = Map({
  isLoading: false,
  favorites: Map(),
  likes: Map(),
})

export function loadDataSuccess(result) {
  return {
    type: LOAD_DATA_SUCCESS,
    result,
  }
}

export function toggleFavorite(id) {
  return (dispatch, getState) => {
    if (getState().app.getIn(['favorites', id])) {
      return dispatch({ type: REMOVE_FAVORITE, id })
    }
    return dispatch({ type: ADD_FAVORITE, id })
  }
}

export function toggleLike(id) {
  return (dispatch, getState) => {
    if (getState().app.getIn(['likes', id])) {
      return dispatch({ type: REMOVE_LIKE, id })
    }
    return dispatch({ type: ADD_LIKE, id })
  }
}

export function loadData() {
  return (dispatch) => {
    dispatch({ type: LOAD_DATA })
    AppData.once('value', snapshot => dispatch(loadDataSuccess(snapshot.val())))
  }
}

export function listenData() {
  return (dispatch) => {
    AppData.on('child_changed', snapshot => {
      console.log(snapshot.val())
      // dispatch(loadDataSuccess(snapshot.val()))
    })
  }
}

export default function AppReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA: {
      return state.set('isLoading', true)
    }
    case LOAD_DATA_SUCCESS: {
      return state.set('isLoading', false)
    }
    case ADD_FAVORITE: {
      return state.update('favorites', f => f.merge({ [action.id]: true }))
    }
    case REMOVE_FAVORITE: {
      return state.update('favorites', f => f.delete(action.id))
    }
    case ADD_LIKE: {
      return state.update('likes', f => f.merge({ [action.id]: true }))
    }
    case REMOVE_LIKE: {
      return state.update('likes', f => f.delete(action.id))
    }
    default:
      return state
  }
}
