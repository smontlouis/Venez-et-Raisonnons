import { Map, List } from 'immutable'
import { firebaseDb } from '../../services/firebase'

const LOAD_DATA = 'app/LOAD_DATA'
const MARK_AS_READ = 'app/MARK_AS_READ'
const REMOVE_AS_READ = 'app/REMOVE_AS_READ'
export const LOAD_DATA_SUCCESS = 'app/LOAD_DATA_SUCCESS'
const LOAD_DATA_FAIL = 'app/LOAD_DATA_FAIL'
const ADD_FAVORITE = 'app/ADD_FAVORITE'
const REMOVE_FAVORITE = 'app/REMOVE_FAVORITE'
export const ADD_LIKE = 'app/ADD_LIKE'
export const REMOVE_LIKE = 'app/REMOVE_LIKE'

const AppData = firebaseDb.ref('/')

const connectedRef = firebaseDb.ref('.info/connected')
connectedRef.on('value', (snap) => {
  if (snap.val() === true) {
    console.log('connected')
  } else {
    console.log('not connected')
  }
})

const initialState = Map({
  isLoading: false,
  favorites: Map(),
  hasBeenRead: Map(),
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

export function markAsRead(id) {
  return {
    type: MARK_AS_READ,
    id
  }
}

export function toggleMarkAsRead(id) {
  return (dispatch, getState) => {
    if (getState().app.getIn(['hasBeenRead', id])) {
      return dispatch({ type: REMOVE_AS_READ, id })
    }
    return dispatch({ type: MARK_AS_READ, id })
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
    const racePromise = Promise.race([
      new Promise(resolve => AppData.once('value', snapshot => resolve(snapshot.val()))),
      new Promise((r, reject) => setTimeout(() => reject(), 5000))
    ])

    racePromise
      .then(val => dispatch(loadDataSuccess(val)))
      .catch((e) => {
        console.log(e)
        return dispatch({ type: LOAD_DATA_FAIL })
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
    case LOAD_DATA_FAIL: {
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
    case MARK_AS_READ: {
      return state.update('hasBeenRead', f => f.merge({ [action.id]: true }))
    }
    case REMOVE_AS_READ: {
      return state.update('hasBeenRead', f => f.delete(action.id))
    }
    default:
      return state
  }
}
