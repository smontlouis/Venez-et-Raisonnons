import React, { Component } from 'react';

import {
  Scene,
  Router,
} from 'react-native-router-flux';

import {
  Home,
  About,
  Page,
} from './containers';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" component={Home} title="Home" initial={true}/>
          <Scene key="page" component={Page} title="Page"/>
          <Scene key="about" component={About} title="About"/>
        </Scene>
      </Router>
    );
  }
}
