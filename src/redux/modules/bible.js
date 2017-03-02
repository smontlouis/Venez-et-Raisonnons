import { Map } from 'immutable'

const SET_TEMP_SELECTED_BOOK = 'bible/SET_TEMP_SELECTED_BOOK'
const SET_TEMP_SELECTED_CHAPTER = 'bible/SET_TEMP_SELECTED_CHAPTER'

const initialState = Map({
  selectedBook: 1,
  selectedChapter: 1,
  temp: Map({
    selectedBook: 1,
    selectedChapter: 1,
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

export default function BibleReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TEMP_SELECTED_BOOK: {
      return state
        .update('temp', t => t.merge({ selectedBook: action.book }))
        .update('temp', t => t.merge({ selectedChapter: 1 }))
    }
    case SET_TEMP_SELECTED_CHAPTER: {
      return state
        .update('temp', t => t.merge({ selectedChapter: action.chapter }))
    }
    default:
      return state
  }
}
