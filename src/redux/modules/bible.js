import { Map } from 'immutable'

import books from '../../helpers/livres'

const SET_TEMP_SELECTED_BOOK = 'bible/SET_TEMP_SELECTED_BOOK'
const SET_TEMP_SELECTED_CHAPTER = 'bible/SET_TEMP_SELECTED_CHAPTER'
const SET_TEMP_SELECTED_VERSE = 'bible/SET_TEMP_SELECTED_VERSE'
const VALIDATE_SELECTED = 'bible/VALIDATE_SELECTED'
const RESET_TEMP_SELECTED = 'bible/RESET_TEMP_SELECTED'

const initialState = Map({
  books,
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

export function resetTempSelected() {
  return {
    type: RESET_TEMP_SELECTED,
  }
}

export function goToPrevChapter() {
  return (dispatch, getState) => {
    const currentChapter = getState().bible.get('selectedChapter')
    if (currentChapter === 1) {
      const currentBook = getState().bible.get('selectedBook').toJS()
      const currentBookIndex = getState().bible.get('books')
        .findIndex(b => b.Numero === currentBook.Numero)

      const prevBook = getState().bible.get('books')[currentBookIndex - 1]
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
    const currentChapter = getState().bible.get('selectedChapter')
    const currentBook = getState().bible.get('selectedBook').toJS()
    if (currentChapter === currentBook.Chapitres) {
      const currentBookIndex = getState().bible.get('books')
        .findIndex(b => b.Numero === currentBook.Numero)

      const nextBook = getState().bible.get('books')[currentBookIndex + 1]
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
    default:
      return state
  }
}
