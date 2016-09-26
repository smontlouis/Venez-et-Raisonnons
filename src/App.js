import React from 'react';
import { Provider } from 'react-redux';

import Routes from './routes';
import createStore from './redux/create';

const store = createStore();

const PleadApp = () =>
  <Provider store={store}>
    <Routes />
  </Provider>
  ;

export default PleadApp;
