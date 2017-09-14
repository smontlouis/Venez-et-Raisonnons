import { firebaseDb } from '@src/services/firebase'
import {
  MARK_AS_READ,
  REMOVE_AS_READ,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_LIKE,
  REMOVE_LIKE,
  USER_LOGIN_SUCCESS
} from './modules/app'

export default store => next => action => {
  const result = next(action)
  const state = store.getState()

  const isLogged = !!state.getIn(['app', 'email'])
  const user = state.get('app')
  const questionRef = firebaseDb.ref(`/questions/${action.id}`)
  const profileRef = firebaseDb.ref(`/profiles/${user.get('uid')}`)

  const favorites = user.get('favorites').toJS()
  const likes = user.get('likes').toJS()
  const hasBeenRead = user.get('hasBeenRead').toJS()

  switch (action.type) {
    case ADD_FAVORITE:
    case REMOVE_FAVORITE: {
      isLogged && profileRef.update({ '/questions/favorites': favorites })
      break
    }
    case ADD_LIKE:
    case REMOVE_LIKE: {
      const likeCount = state.getIn(['questions', 'questions', action.id, 'likeCount'])

      isLogged && profileRef.update({ '/questions/likes': likes })
      questionRef.update({ likeCount })
      break
    }
    case MARK_AS_READ:
    case REMOVE_AS_READ: {
      isLogged && profileRef.update({ '/questions/hasBeenRead': hasBeenRead })
      break
    }
    case USER_LOGIN_SUCCESS: {
      if (isLogged) {
        const userWithoutProps = { ...user.toJS() }
        delete userWithoutProps.favorites
        delete userWithoutProps.hasBeenRead
        delete userWithoutProps.likes
        delete userWithoutProps.lastUpdate

        profileRef.update({ ...userWithoutProps })

        profileRef.update({ '/questions/hasBeenRead': hasBeenRead })
        profileRef.update({ '/questions/favorites': favorites })
        profileRef.update({ '/questions/likes': likes })
      }
      break
    }
    default:
  }

  return result
}
