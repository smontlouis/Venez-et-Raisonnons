import { Map } from 'immutable'
import { firebaseDb } from '@src/services/firebase'

const LOAD_DATA = 'app/LOAD_DATA'
export const LOAD_DATA_SUCCESS = 'app/LOAD_DATA_SUCCESS'
const LOAD_DATA_FAIL = 'app/LOAD_DATA_FAIL'
export const SET_LAST_UPDATE = 'app/SET_LAST_UPDATE'

const AppData = firebaseDb.ref('/')

// const connectedRef = firebaseDb.ref('.info/connected')
// connectedRef.on('value', (snap) => {
//   if (snap.val() === true) {
//     console.log('connected')
//   } else {
//     console.log('not connected')
//   }
// })

const initialState = Map({
  lastUpdate: 0,
  isLoading: false
})

export function loadDataSuccess (result) {
  return {
    type: LOAD_DATA_SUCCESS,
    result
  }
}

export function setLastUpdate (val) {
  return {
    type: SET_LAST_UPDATE,
    val
  }
}

export function loadData () {
  return (dispatch, getState) => {
    const getLastUpdate = Promise.race([
      new Promise(resolve => firebaseDb.ref('/app/last_update').once('value', snapshot => resolve(snapshot.val()))),
      new Promise((resolve, reject) => setTimeout(() => reject(new Error('Fail to connect to dabatase')), 10000))
    ])

    getLastUpdate
      .then((lastUpdate) => {
        const stateUpdate = getState().getIn(['app', 'lastUpdate'])

        // If update available
        if (lastUpdate !== stateUpdate) {
          dispatch({ type: LOAD_DATA })
          const racePromise = Promise.race([
            new Promise(resolve => AppData.once('value', snapshot => resolve(snapshot.val()))),
            new Promise((resolve, reject) => setTimeout(() => reject(new Error('Fail to connect to dabatase')), 10000))
          ])

          racePromise
            .then((val) => {
              dispatch(setLastUpdate(lastUpdate))
              dispatch(loadDataSuccess(val))
            })
            .catch((e) => {
              console.log(e)
              return dispatch({ type: LOAD_DATA_FAIL })
            })
        }
      })
      .catch(() => console.log('No connection'))
  }
}

export default function AppReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA: {
      return state.set('isLoading', true)
    }
    case LOAD_DATA_SUCCESS: {
      return state.set('isLoading', false)
    }
    case LOAD_DATA_FAIL: {
      return state.set('isLoading', false)
    }
    case SET_LAST_UPDATE: {
      return state.set('lastUpdate', action.val)
    }
    default:
      return state
  }
}
