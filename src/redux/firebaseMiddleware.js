import { firebaseDb } from '@src/services/firebase'
import {
  MARK_AS_READ,
  REMOVE_AS_READ,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ADD_LIKE,
  REMOVE_LIKE,
  USER_LOGIN_SUCCESS,
  ADD_HIGHLIGHT,
  REMOVE_HIGHLIGHT,
  ADD_VERSE_FAVORITE,
  REMOVE_VERSE_FAVORITE
} from './modules/user'

export default store => next => action => {
  const result = next(action)
  const state = store.getState()

  const isLogged = !!state.getIn(['user', 'email'])
  const user = state.get('user')
  const questionRef = firebaseDb.ref(`/questions/${action.id}`)
  const profileRef = firebaseDb.ref(`/profiles/${user.get('uid')}`)

  switch (action.type) {
    case ADD_FAVORITE:
    case REMOVE_FAVORITE: {
      const favorites = user.getIn(['questions', 'favorites']).toJS()
      isLogged && profileRef.update({ '/questions/favorites': favorites })
      break
    }
    case ADD_LIKE:
    case REMOVE_LIKE: {
      const likes = user.getIn(['questions', 'likes']).toJS()
      const likeCount = state.getIn(['questions', 'questions', action.id, 'likeCount'])

      isLogged && profileRef.update({ '/questions/likes': likes })
      questionRef.update({ likeCount })
      break
    }
    case MARK_AS_READ:
    case REMOVE_AS_READ: {
      const hasBeenRead = user.getIn(['questions', 'hasBeenRead']).toJS()
      isLogged && profileRef.update({ '/questions/hasBeenRead': hasBeenRead })
      break
    }
    case ADD_HIGHLIGHT:
    case REMOVE_HIGHLIGHT: {
      const highlights = user.getIn(['bible', 'highlights']).toJS()
      isLogged && profileRef.update({ '/bible/highlights': highlights })
      break
    }
    case ADD_VERSE_FAVORITE:
    case REMOVE_VERSE_FAVORITE: {
      const favorites = user.getIn(['bible', 'favorites']).toJS()
      isLogged && profileRef.update({ '/bible/favorites': favorites })
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
