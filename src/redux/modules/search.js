import { Map } from 'immutable'

const SET_SEARCH_INPUT = 'search/SET_SEARCH_INPUT'

const initialState = Map({
  input: ''
})

export function setSearchInput (result) {
  return {
    type: SET_SEARCH_INPUT,
    result
  }
}

export default function SearchReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_SEARCH_INPUT: {
      return state
              .set('input', action.result)
    }
    default:
      return state
  }
}
