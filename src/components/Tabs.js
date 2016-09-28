import React, { PropTypes } from 'react';
import { Link } from 'react-router-native';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
  },
  tabsActiveStyle: {
    backgroundColor: '#B185FD',
  },
  tabLink: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CECAFE',
  },
  tabLinkText: {
    fontSize: 12,
  },
});

const options = {
  activeStyle: styles.tabsActiveStyle,
  style: styles.tabLink,
  underlayColor: 'transparent',
};

const Tabs = () => (
  <View style={styles.tabs}>
    <Link
      to="/"
      {...options}
    >
      <Text style={styles.tabLinkText}>Topics</Text>
    </Link>
    <Link
      to="/favorites"
      {...options}
    >
      <Text style={styles.tabLinkText}>Favoris</Text>
    </Link>
    <Link
      to="/profile"
      {...options}
    >
      <Text style={styles.tabLinkText}>Moi</Text>
    </Link>
    <Link
      to="/more"
      {...options}
    >
      <Text style={styles.tabLinkText}>Plus</Text>
    </Link>
  </View>
);

Tabs.PropTypes = {

};

export default Tabs;
