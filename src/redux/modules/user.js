import { Map, fromJS } from 'immutable'
import { clearSelectedVerses } from './bible'
import { showLoginModal } from './app'
import books from '@src/helpers/livres'
import { Share } from 'react-native'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_UPDATE_PROFILE = 'USER_UPDATE_PROFILE'
export const USER_LOGOUT = 'USER_LOGOUT'
export const MARK_AS_READ = 'user/MARK_AS_READ'
export const REMOVE_AS_READ = 'user/REMOVE_AS_READ'
export const ADD_FAVORITE = 'user/ADD_FAVORITE'
export const REMOVE_FAVORITE = 'user/REMOVE_FAVORITE'
export const ADD_LIKE = 'user/ADD_LIKE'
export const REMOVE_LIKE = 'user/REMOVE_LIKE'
export const ADD_HIGHLIGHT = 'user/ADD_HIGHLIGHT'
export const REMOVE_HIGHLIGHT = 'user/REMOVE_HIGHLIGHT'
export const ADD_VERSE_FAVORITE = 'user/ADD_VERSE_FAVORITE'
export const REMOVE_VERSE_FAVORITE = 'user/REMOVE_VERSE_FAVORITE'
export const SAVE_NOTE = 'user/SAVE_NOTE'

const initialState = Map({
  email: '',
  displayName: '',
  photoURL: '',
  provider: '',
  lastSeen: 0,
  emailVerified: false,
  questions: Map({
    favorites: Map(),
    hasBeenRead: Map(),
    likes: Map()
  }),
  bible: Map({
    highlights: Map(),
    notes: Map(),
    favorites: Map()
  })
})

const addDateToVerses = (verses, now = Date.now()) => {
  const formattedObj = Object.keys(verses.toJS()).reduce((obj, verse) => ({
    ...obj,
    [verse]: now
  }), {})

  return fromJS(formattedObj)
}

export default function UserReducer (state = initialState, action = {}) {
  switch (action.type) {
    case USER_UPDATE_PROFILE:
    case USER_LOGIN_SUCCESS: {
      return state
        .mergeDeep(action.payload)
    }
    case USER_LOGOUT: {
      return initialState
    }
    case ADD_FAVORITE: {
      return state.updateIn(['questions', 'favorites'], f => f.merge({ [action.id]: Date.now() }))
    }
    case REMOVE_FAVORITE: {
      return state.updateIn(['questions', 'favorites'], f => f.delete(action.id))
    }
    case ADD_LIKE: {
      return state.updateIn(['questions', 'likes'], f => f.merge({ [action.id]: Date.now() }))
    }
    case REMOVE_LIKE: {
      return state.updateIn(['questions', 'likes'], f => f.delete(action.id))
    }
    case MARK_AS_READ: {
      return state.updateIn(['questions', 'hasBeenRead'], f => f.merge({ [action.id]: Date.now() }))
    }
    case REMOVE_AS_READ: {
      return state.updateIn('questions', 'hasBeenRead', f => f.delete(action.id))
    }
    case ADD_HIGHLIGHT: {
      return state.updateIn(['bible', 'highlights'], f => f.merge(addDateToVerses(action.selectedVerses)))
    }
    case REMOVE_HIGHLIGHT: {
      return Object.keys(action.selectedVerses.toJS()).reduce((map, key) => map.deleteIn(['bible', 'highlights', key]), state)
    }
    case ADD_VERSE_FAVORITE: {
      return state.updateIn(['bible', 'favorites'], f => f.merge(addDateToVerses(action.selectedVerses)))
    }
    case REMOVE_VERSE_FAVORITE: {
      return Object.keys(action.selectedVerses.toJS()).reduce((map, key) => map.deleteIn(['bible', 'favorites', key]), state)
    }
    case SAVE_NOTE: {
      return state.updateIn(['bible', 'notes'], f => f.merge(addDateToVerses(action.selectedIds)))
    }
    default:
      return state
  }
}

const isLogged = (state) => !!state.getIn(['user', 'email'])

const modalIfNotLoggedFn = (state, dispatch) => actionToDispath => {
  if (isLogged(state)) {
    return Promise.resolve(dispatch(actionToDispath))
  } else {
    return Promise.reject(dispatch(showLoginModal()))
  }
}

export function toggleFavorite (id) {
  return (dispatch, getState) => {
    const modalIfNotLogged = modalIfNotLoggedFn(getState(), dispatch)
    if (getState().getIn(['user', 'questions', 'favorites', id])) {
      return modalIfNotLogged({ type: REMOVE_FAVORITE, id })
    }
    return modalIfNotLogged({ type: ADD_FAVORITE, id })
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
    const modalIfNotLogged = modalIfNotLoggedFn(getState(), dispatch)
    if (getState().getIn(['user', 'questions', 'hasBeenRead', id])) {
      return modalIfNotLogged({ type: REMOVE_AS_READ, id })
    }
    return modalIfNotLogged({ type: MARK_AS_READ, id })
  }
}

export function toggleLike (id) {
  return (dispatch, getState) => {
    const modalIfNotLogged = modalIfNotLoggedFn(getState(), dispatch)
    if (getState().getIn(['user', 'questions', 'likes', id])) {
      return modalIfNotLogged({ type: REMOVE_LIKE, id })
    }
    return modalIfNotLogged({ type: ADD_LIKE, id })
  }
}

export function toggleHighlight (hasHighlighted) {
  return (dispatch, getState) => {
    const selectedVerses = getState().getIn(['bible', 'selectedVerses'])
    const modalIfNotLogged = modalIfNotLoggedFn(getState(), dispatch)

    dispatch(clearSelectedVerses())

    if (hasHighlighted) {
      return modalIfNotLogged({ type: REMOVE_HIGHLIGHT, selectedVerses })
    } else {
      return modalIfNotLogged({ type: ADD_HIGHLIGHT, selectedVerses })
    }
  }
}

export function toggleVerseFavorite (hasFavorited) {
  return (dispatch, getState) => {
    const selectedVerses = getState().getIn(['bible', 'selectedVerses'])
    const modalIfNotLogged = modalIfNotLoggedFn(getState(), dispatch)

    dispatch(clearSelectedVerses())

    if (hasFavorited) {
      return modalIfNotLogged({ type: REMOVE_VERSE_FAVORITE, selectedVerses })
    } else {
      return modalIfNotLogged({ type: ADD_VERSE_FAVORITE, selectedVerses })
    }
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

export function onUserUpdateProfile (profile) {
  return {
    type: USER_UPDATE_PROFILE,
    payload: profile
  }
}

export function shareVerses (verses) {
  return (dispatch, getState) => {
    const selectedVerses = getState().getIn(['bible', 'selectedVerses'])
    const filteredVerses = verses
      .filter(v => !!selectedVerses.get(`${v.Livre}-${v.Chapitre}-${v.Verset}`))

    const selectedVersesContent = filteredVerses
      .map(v => `(${v.Verset}) ${v.Texte}`)
      .join(' ')

    const titleContent = filteredVerses
      .map(v => Number(v.Verset))
      .reduce((acc, v, i, array) => {
        if (v === array[i - 1] + 1 && v === array[i + 1] - 1) { // if suite > 2
          return acc
        } else if (v === array[i - 1] + 1 && v !== array[i + 1] - 1) { // if endSuite
          return acc + `-${v}`
        } else if (array[i - 1] && (v - 1 !== array[i - 1])) { // if not preceded by - 1
          return acc + `,${v}`
        } else {
          return acc + v
        }
      }, `${books[verses[0].Livre - 1].Nom} ${verses[0].Chapitre}:`)
    Share.share({
      message: `${titleContent} \n\n ${selectedVersesContent}`
    })
      .then(result => {
        dispatch(clearSelectedVerses())
      })
      .catch(err => console.log(err))
  }
}

export function saveNote (note, selectedIds) {
  return {
    type: SAVE_NOTE,
    note,
    selectedIds
  }
}
