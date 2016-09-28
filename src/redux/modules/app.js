import { Map } from 'immutable';

import { REHYDRATE } from 'redux-persist/constants';

const initialState = Map({
  isRehydrated: false,
});

export default function Topicseducer(state = initialState, action = {}) {
  switch (action.type) {
    case REHYDRATE: {
      return state.set('isRehydrated', true);
    }
    default:
      return state;
  }
}
