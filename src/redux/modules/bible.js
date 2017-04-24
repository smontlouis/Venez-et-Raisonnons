import { Map, fromJS } from 'immutable'

import books from '@src/helpers/livres'

const SET_TEMP_SELECTED_BOOK = 'bible/SET_TEMP_SELECTED_BOOK'
const SET_TEMP_SELECTED_CHAPTER = 'bible/SET_TEMP_SELECTED_CHAPTER'
const SET_TEMP_SELECTED_VERSE = 'bible/SET_TEMP_SELECTED_VERSE'
const VALIDATE_SELECTED = 'bible/VALIDATE_SELECTED'
const SET_ALL_AND_VALIDATE_SELECTED = 'bible/SET_ALL_AND_VALIDATE_SELECTED'
const RESET_TEMP_SELECTED = 'bible/RESET_TEMP_SELECTED'
const SET_VERSION = 'bible/SET_VERSION'

const initialState = Map({
  books,
  selectedVersion: 'STRONG',
  selectedBook: Map({ Numero: 1, Nom: 'Genèse', Chapitres: 50 }),
  selectedChapter: 1,
  selectedVerse: 1,
  temp: Map({
    selectedBook: Map({ Numero: 1, Nom: 'Genèse', Chapitres: 50 }),
    selectedChapter: 1,
    selectedVerse: 1,
  })
})

export function setTempSelectedBook(book) {
  return {
    type: SET_TEMP_SELECTED_BOOK,
    book,
  }
}

export function setTempSelectedChapter(chapter) {
  return {
    type: SET_TEMP_SELECTED_CHAPTER,
    chapter,
  }
}

export function setTempSelectedVerse(verse) {
  return {
    type: SET_TEMP_SELECTED_VERSE,
    verse,
  }
}

export function validateSelected() {
  return {
    type: VALIDATE_SELECTED,
  }
}

export function setAllAndValidateSelected(selected) {
  return {
    type: SET_ALL_AND_VALIDATE_SELECTED,
    selected
  }
}

export function resetTempSelected() {
  return {
    type: RESET_TEMP_SELECTED,
  }
}

export function setVersion(version) {
  return {
    type: SET_VERSION,
    version,
  }
}

export function goToPrevChapter() {
  return (dispatch, getState) => {
    const currentChapter = getState().get('bible').get('selectedChapter')
    if (currentChapter === 1) {
      const currentBook = getState().get('bible').get('selectedBook').toJS()
      const currentBookIndex = getState().get('bible').get('books')
        .findIndex(b => b.Numero === currentBook.Numero)

      const prevBook = getState().get('bible').get('books')[currentBookIndex - 1]
      dispatch(setTempSelectedBook(prevBook))
      dispatch(setTempSelectedChapter(prevBook.Chapitres))
      return dispatch(validateSelected())
    }

    dispatch(setTempSelectedChapter(currentChapter - 1))
    return dispatch(validateSelected())
  }
}

export function goToNextChapter() {
  return (dispatch, getState) => {
    const currentChapter = getState().get('bible').get('selectedChapter')
    const currentBook = getState().get('bible').get('selectedBook').toJS()
    if (currentChapter === currentBook.Chapitres) {
      const currentBookIndex = getState().get('bible').get('books')
        .findIndex(b => b.Numero === currentBook.Numero)

      const nextBook = getState().get('bible').get('books')[currentBookIndex + 1]
      dispatch(setTempSelectedBook(nextBook))
      return dispatch(validateSelected())
    }

    dispatch(setTempSelectedChapter(currentChapter + 1))
    return dispatch(validateSelected())
  }
}

export default function BibleReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TEMP_SELECTED_BOOK: {
      return state
        .update('temp', t => t.merge({
          selectedBook: action.book,
          selectedChapter: 1,
          selectedVerse: 1,
        }))
    }
    case SET_TEMP_SELECTED_CHAPTER: {
      return state
        .update('temp', t => t.merge({
          selectedChapter: action.chapter,
          selectedVerse: 1,
        }))
    }
    case SET_TEMP_SELECTED_VERSE: {
      return state
        .update('temp', t => t.merge({
          selectedVerse: action.verse,
        }))
    }
    case SET_ALL_AND_VALIDATE_SELECTED: {
      return state
        .update('temp', t => t.merge({
          selectedBook: fromJS(action.selected.book) || state.get('temp').get('selectedBook'),
          selectedChapter: action.selected.chapter || state.get('temp').get('selectedChapter'),
          selectedVerse: action.selected.verse || state.get('temp').get('selectedVerse'),
        }))
        .set('selectedVersion', action.selected.version || state.get('selectedVersion'))
        .set('selectedBook', fromJS(action.selected.book) || state.get('temp').get('selectedBook'))
        .set('selectedChapter', action.selected.chapter || state.get('temp').get('selectedChapter'))
        .set('selectedVerse', action.selected.verse || state.get('temp').get('selectedVerse'))
    }
    case VALIDATE_SELECTED: {
      return state
        .set('selectedBook', state.get('temp').get('selectedBook'))
        .set('selectedChapter', state.get('temp').get('selectedChapter'))
        .set('selectedVerse', state.get('temp').get('selectedVerse'))
    }
    case RESET_TEMP_SELECTED: {
      return state
        .update('temp', t => t.merge({
          selectedBook: state.get('selectedBook'),
          selectedChapter: state.get('selectedChapter'),
          selectedVerse: state.get('selectedVerse'),
        }))
    }
    case SET_VERSION: {
      return state.set('selectedVersion', action.version)
    }
    default:
      return state
  }
}
