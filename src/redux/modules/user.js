import { Map } from 'immutable'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGOUT = 'USER_LOGOUT'
export const MARK_AS_READ = 'user/MARK_AS_READ'
export const REMOVE_AS_READ = 'user/REMOVE_AS_READ'
export const ADD_FAVORITE = 'user/ADD_FAVORITE'
export const REMOVE_FAVORITE = 'user/REMOVE_FAVORITE'
export const ADD_LIKE = 'user/ADD_LIKE'
export const REMOVE_LIKE = 'user/REMOVE_LIKE'

const initialState = Map({
  email: '',
  displayName: '',
  photoURL: '',
  provider: '',
  lastSeen: 0,
  emailVerified: false,
  favorites: Map(),
  hasBeenRead: Map(),
  likes: Map()
})

export default function UserReducer (state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      return state
        .mergeDeep(action.payload)
    }
    case USER_LOGOUT: {
      return initialState
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

export function toggleFavorite (id) {
  return (dispatch, getState) => {
    if (getState().getIn(['user', 'favorites', id])) {
      return dispatch({ type: REMOVE_FAVORITE, id })
    }
    return dispatch({ type: ADD_FAVORITE, id })
  }
}

export function markAsRead (id) {
  return {
    type: MARK_AS_READ,
    id
  }
}

export function removeAsRead (id) {
  return {
    type: REMOVE_AS_READ,
    id
  }
}

export function toggleMarkAsRead (id) {
  return (dispatch, getState) => {
    if (getState().getIn(['user', 'hasBeenRead', id])) {
      return dispatch({ type: REMOVE_AS_READ, id })
    }
    return dispatch({ type: MARK_AS_READ, id })
  }
}

export function toggleLike (id) {
  return (dispatch, getState) => {
    if (getState().getIn(['user', 'likes', id])) {
      return dispatch({ type: REMOVE_LIKE, id })
    }
    return dispatch({ type: ADD_LIKE, id })
  }
}

export function onUserLoginSuccess (profile) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: profile
  }
}

export function onUserLogout () {
  return {
    type: USER_LOGOUT
  }
}
