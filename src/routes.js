import React from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import {
  Route,
  // StackRoute,
  TabsRoute,
  Router,
  nativeHistory,
} from 'react-router-native';

import {
  Master,
  Topics,
  Favorites,
  Profile,
  More,
  Login,
} from './containers';

import store from './redux/store';

const history = syncHistoryWithStore(nativeHistory, store);

const userIsLogged = (nextState, replace) => {
  if (!store.getState().auth.get('isLoggedIn')) {
    console.log('replaceByLogin');
    replace('/login');
  }
};

const userIsNotLogged = (nextState, replace) => {
  if (store.getState().auth.get('isLoggedIn')) {
    replace('/');
  }
};

const Routes = () =>
  <Provider store={store}>
    <Router history={nativeHistory} addressBar>
      <TabsRoute
        path="master"
        component={Master}
        transition="horizontal-pager"
        onEnter={userIsLogged}
      >
        <Route
          path="/"
          component={Topics}
        />
        <Route
          path="/favorites"
          component={Favorites}
        />
        <Route
          path="/profile"
          component={Profile}
        />
        <Route
          path="/more"
          component={More}
        />
      </TabsRoute>
      <Route
        path="/login"
        component={Login}
        onEnter={userIsNotLogged}
      />
    </Router>
  </Provider>
;

export default Routes;
