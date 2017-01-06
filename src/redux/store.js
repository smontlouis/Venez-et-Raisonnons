import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { install } from 'redux-loop'
import { autoRehydrate } from 'redux-persist'
import reducer from './modules/reducer'

export default function configureStore() {
  let store

  if (__DEV__) {
    store = compose(
      install(),
      autoRehydrate(),
      applyMiddleware(thunk),
      global.reduxNativeDevTools ? global.reduxNativeDevTools() : noop => noop,
    )(createStore)(reducer)

    if (global.reduxNativeDevTools) {
      global.reduxNativeDevTools.updateStore(store)
    }

    if (module.hot) {
      module.hot.accept(() => {
        const nextRootReducer = require('./modules/reducer').default

        store.replaceReducer(nextRootReducer)
      })
    }
  } else {
    store = compose(
      install(),
      autoRehydrate(),
      applyMiddleware(thunk),
    )(createStore)(reducer)
  }

  return store
}
