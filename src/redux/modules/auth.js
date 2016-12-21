import { Map, fromJS } from 'immutable'

const USER_LOGIN_SUCCESS = 'auth/USER_LOGIN_SUCCESS'
const USER_LOGIN_ERROR = 'auth/USER_LOGIN_ERROR'

const initialState = Map({
  isLoggedIn: false,
  currentUser: null,
  authenticationToken: null
})

export default function AuthReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      return state
        .set('isLoggedIn', true)
        .set('currentUser', action.payload.profile)
        .set('authenticationToken', action.payload.token)
    }
    case USER_LOGIN_ERROR: {
      return initialState
    }
    default:
      return state
  }
}

export function onUserLoginSuccess(profile, token) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: {
      profile: fromJS(profile),
      token: fromJS(token)
    }
  }
}

export function onUserLoginError(error) {
  return {
    type: USER_LOGIN_ERROR,
    payload: error,
    error: true
  }
}
