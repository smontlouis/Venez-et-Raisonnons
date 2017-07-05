import { Map } from 'immutable'

const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
const USER_LOGOUT = 'USER_LOGOUT'

const initialState = Map({
  email: '',
  displayName: '',
  photoURL: '',
  provider: '',
  lastSeen: 0,
  emailVerified: false
})

export default function UserReducer (state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      return state
        .merge(action.payload)
    }
    case USER_LOGOUT: {
      return initialState
    }
    default:
      return state
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
