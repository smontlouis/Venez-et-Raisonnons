import { Record } from 'immutable';

const TEST_ACTION = 'home/TEST_ACTION';

const InitialState = Record({
  test: 14,
});

const initialState = new InitialState();

export default function reducer(state = initialState, action = {}) {
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
