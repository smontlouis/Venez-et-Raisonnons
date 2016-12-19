import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';

import { firebaseDb } from '../../services/firebase';

const LOAD_DATA = 'app/LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'app/LOAD_DATA_SUCCESS';
const LOAD_DATA_FAIL = 'app/LOAD_DATA_FAIL';

const AppData = firebaseDb.ref('/');

const initialState = Map({
  isRehydrated: false,
  isLoading: false,
});

export function loadDataSuccess(result) {
  return {
    type: LOAD_DATA_SUCCESS,
    result,
  };
}

export function loadData() {
  return (dispatch) => {
    dispatch({ type: LOAD_DATA });
    AppData.once('value', snapshot => dispatch(loadDataSuccess(snapshot.val())));
  };
}

export default function AppReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REHYDRATE: {
      return state.set('isRehydrated', true);
    }
    case LOAD_DATA: {
      return state.set('isLoading', true);
    }
    default:
      return state;
  }
}
