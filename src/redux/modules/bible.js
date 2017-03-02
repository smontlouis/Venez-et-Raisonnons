import { Map } from 'immutable'

const SET_TEMP_SELECTED_BOOK = 'bible/SET_TEMP_SELECTED_BOOK'
const SET_TEMP_SELECTED_CHAPTER = 'bible/SET_TEMP_SELECTED_CHAPTER'
const SET_TEMP_SELECTED_VERSE = 'bible/SET_TEMP_SELECTED_VERSE'
const VALIDATE_SELECTED = 'bible/VALIDATE_SELECTED'
const RESET_TEMP_SELECTED = 'bible/RESET_TEMP_SELECTED'

const initialState = Map({
  selectedBook: 1,
  selectedChapter: 1,
  selectedVerse: 1,
  temp: Map({
    selectedBook: 1,
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
