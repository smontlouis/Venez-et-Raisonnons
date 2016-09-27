import { createStore, compose } from 'redux';
// import Reactotron from 'reactotron-react-native';

import reducer from './modules/reducer';

let store;

if (__DEV__) {
  // const devTools = require('remote-redux-devtools');
  // const createTrackingEnhancer = require('reactotron-redux');
  // const reactotronEnhancer = createTrackingEnhancer(Reactotron);

  store = createStore(reducer, compose(
    // reactotronEnhancer,
    global.reduxNativeDevTools ?
      global.reduxNativeDevTools(/*options*/) :
      noop => noop,
    // devTools(),
  ));

  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }
  // devTools.updateStore(store);
} else {
  store = createStore(reducer);
}

export default store;
