import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';

import {
  Route,
  TabsRoute,
  StackRoute,
  Router,
  nativeHistory,
} from 'react-router-native';

import {
  Master,
  MasterWithTabs,
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

  // Set current path to '/'
  history.push('/');

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
    <Router
      history={history}
      // addressBar
    >
      <TabsRoute
        path="mainApp"
        component={MasterWithTabs}
        onEnter={userIsLogged}
        transition="horizontal-pager"
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
      <StackRoute
        path="fullscreen"
        component={Master}
        transition="horizontal-card-stack"
      >
        <Route
          path="/topics/:topicId"
          component={Topic}
        />
        <Route
          path="/questions/:questionId"
          component={Question}
        />
        <Route
          path="/login"
          component={Login}
          onEnter={userIsNotLogged}
        />
      </StackRoute>
    </Router>
  );
}
