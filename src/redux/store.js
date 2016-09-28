import { createStore, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import { AsyncStorage } from 'react-native';

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

persistStore(store, {
  storage: AsyncStorage,
  transforms: [immutableTransform()]
}, () => {
  console.log('store rehydrated');
});

export default store;
