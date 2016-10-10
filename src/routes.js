import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';

import {
  Route,
  StackRoute,
  TabsRoute,
  Router,
  nativeHistory,
} from 'react-router-native';

import {
  Master,
  Topics,
  Topic,
  Favorites,
  Profile,
  More,
  Login,
  Question,
} from './containers';

export default function (store) {
  const history = syncHistoryWithStore(nativeHistory, store);

  const userIsLogged = (nextState, replace) => {
    if (!store.getState().auth.get('isLoggedIn')) {
      replace('/login');
    }
  };

  const userIsNotLogged = (nextState, replace) => {
    if (store.getState().auth.get('isLoggedIn')) {
      replace('/');
    }
  };

  return (
    <Router history={nativeHistory} addressBar>
      <TabsRoute
        path="master"
        component={Master}
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
      <Route
        path="topics/:topicId"
        component={Topic}
      />
      <Route
        path="questions/:questionId"
        component={Question}
      />
    </Router>
  );
}
