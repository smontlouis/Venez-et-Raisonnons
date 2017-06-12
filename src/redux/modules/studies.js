import R from 'ramda'
import { Map, fromJS } from 'immutable'
import { LOAD_DATA_SUCCESS } from './app'

const initialState = Map({
  studies: Map()
})

export default function TopicsReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS: {
      const { meditations: response } = action.result
      // Here we're just adding id as a key (will be needed duh)
      const studies = R.mapObjIndexed((val, id) => ({ id, ...val }), response)
      return state
              .update('studies', t => t.merge(fromJS(studies)))
    }
    default:
      return state
  }
}
