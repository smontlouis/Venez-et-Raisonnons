import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

// import * as TopicsActions from '../redux/modules/topics';

import * as auth0 from '../services/auth0';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});


@connect(
  ({ auth }) => ({
    isLoggedIn: auth.get('isLoggedIn'),
  }),
  null,
)
@withRouter
export default class Login extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      auth0.showLogin();
    }
  }

  componentWillReceiveProps({ isLoggedIn, router }) {
    if (isLoggedIn) {
      router.push('/');
    } else {
      auth0.showLogin();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
        LOGIN
        </Text>
      </View>
    );
  }
}