import { Map } from 'immutable';

const TEST_ACTION = 'home/TEST_ACTION';

const initialState = Map({
  test: 14,
});

export default function HomeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TEST_ACTION: {
      return state.set('test', 2);
    }
    default:
      return state;
  }
}

export function changeTest() {
  return { type: TEST_ACTION };
}
