import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { autoRehydrate } from 'redux-persist-immutable'
import { Map } from 'immutable'
import questionsNotifier from './questionsNotifier'
import firebaseMiddleware from './firebaseMiddleware'
import reducer from './modules/reducer'

export default function configureStore () {
  let store
  const initialState = Map()

  if (__DEV__) {
    store = compose(
      autoRehydrate(),
      applyMiddleware(thunk, questionsNotifier, firebaseMiddleware),
      global.reduxNativeDevTools ? global.reduxNativeDevTools() : noop => noop
    )(createStore)(reducer)

    if (global.reduxNativeDevTools) {
      global.reduxNativeDevTools.updateStore(store)
    }

    if (module.hot) {
      module.hot.accept(() => {
        const nextRootReducer = require('./modules/reducer').default

        store.replaceReducer(nextRootReducer, initialState)
      })
    }
  } else {
    store = compose(
      autoRehydrate(),
      applyMiddleware(thunk, questionsNotifier, firebaseMiddleware)
    )(createStore)(reducer, initialState)
  }

  return store
}
