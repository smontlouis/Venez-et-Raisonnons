import R from 'ramda'
import { Map, fromJS } from 'immutable'
import { LOAD_DATA_SUCCESS } from './app'

const SAVE_BASE_64_IMAGES = 'topics/SAVE_BASE_64_IMAGES'

const initialState = Map({
  topics: Map(),
  base64Images: Map(),
})

export function saveBase64Image(id, base64Img) {
  return {
    type: SAVE_BASE_64_IMAGES,
    result: { id, base64Img },
  }
}

export default function TopicsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS: {
      const { topics: response } = action.result
      // Here we're just adding id as a key (will be needed duh)
      const topics = R.mapObjIndexed((val, id) => ({ id, ...val }), response)
      return state
              .update('topics', t => t.merge(fromJS(topics)))
    }
    case SAVE_BASE_64_IMAGES: {
      const { id, base64Img } = action.result
      return state
              .update('base64Images', b => b.merge({ [id]: base64Img }))
    }
    default:
      return state
  }
}
