import { firebaseDb } from '@src/services/firebase'
import {
  MARK_AS_READ,
  REMOVE_AS_READ,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_LIKE,
  REMOVE_LIKE,
  USER_LOGIN_SUCCESS
} from './modules/user'

export default store => next => action => {
  const result = next(action)
  const state = store.getState()

  const isLogged = !!state.getIn(['user', 'email'])
  const user = state.get('user')
  const questionRef = firebaseDb.ref(`/questions/${action.id}`)
  const profileRef = firebaseDb.ref(`profiles/${user.get('uid')}`)

  switch (action.type) {
    case ADD_FAVORITE:
    case REMOVE_FAVORITE: {
      const favorites = user.get('favorites').toJS()
      isLogged && profileRef.update({ favorites })
      break
    }
    case ADD_LIKE:
    case REMOVE_LIKE: {
      const likeCount = state.getIn(['questions', 'questions', action.id, 'likeCount'])
      const likes = user.get('likes').toJS()

      isLogged && profileRef.update({ likes })
      questionRef.update({ likeCount })
      break
    }
    case MARK_AS_READ:
    case REMOVE_AS_READ: {
      const hasBeenRead = user.get('hasBeenRead').toJS()
      isLogged && profileRef.update({ hasBeenRead })
      break
    }
    case USER_LOGIN_SUCCESS: {
      isLogged && profileRef.update({ ...user.toJS() })
      break
    }
    default:
  }

  return result
}
