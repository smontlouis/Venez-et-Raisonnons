import { createStore, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import reducer from './modules/reducer';

let store;

if (__DEV__) {
  store = compose(
    autoRehydrate(),
    global.reduxNativeDevTools ? global.reduxNativeDevTools() : noop => noop,
  )(createStore)(reducer);

  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }
} else {
  store = compose(
    autoRehydrate()
  )(createStore)(reducer);
}

export default store;
