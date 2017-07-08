import R from 'ramda'
import { Map, fromJS } from 'immutable'
import { LOAD_DATA_SUCCESS } from './app'

const SAVE_LOCAL_IMAGES = 'topics/SAVE_LOCAL_IMAGES'

const initialState = Map({
  topics: Map(),
  localImages: Map()
})

export function saveLocalImage (id, localImage) {
  return {
    type: SAVE_LOCAL_IMAGES,
    result: { id, localImage }
  }
}

export default function TopicsReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS: {
      const { topics: response } = action.result
      // Here we're just adding id as a key (will be needed duh)
      const topics = R.mapObjIndexed((val, id) => ({ id, ...val }), response)
      return state
              .update('topics', t => t.merge(fromJS(topics)))
    }
    case SAVE_LOCAL_IMAGES: {
      const { id, localImage } = action.result
      return state
              .update('localImages', b => b.merge({ [id]: localImage }))
    }
    default:
      return state
  }
}
