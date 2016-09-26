import { createStore as _createStore, compose } from 'redux';
// import Reactotron from 'reactotron-react-native';

import reducer from './modules/reducer';

export default function createStore() {
  let store;

  if (__DEV__) {
    const devTools = require('remote-redux-devtools');
    // const createTrackingEnhancer = require('reactotron-redux');
    // const reactotronEnhancer = createTrackingEnhancer(Reactotron);

    store = _createStore(reducer, compose(
      // reactotronEnhancer,
      devTools(),
    ));

    devTools.updateStore(store);
  } else {
    store = _createStore(reducer);
  }


  return store;
}
