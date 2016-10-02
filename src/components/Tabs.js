import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import Tab from './Tab';

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 56,
  },
  tabLink: {
    flex: 1,
  },
  tabLinkActive: {
    backgroundColor: 'blue',
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabLinkText: {
    fontSize: 11,
    color: '#BFBFBF',
  },
});

const links = [
  {
    to: '/',
    icon: 'question-answer',
    label: 'Topics',
  },
  {
    to: '/favorites',
    icon: 'favorite',
    label: 'Favoris',
  },
  {
    to: '/profile',
    icon: 'account-circle',
    label: 'Moi',
  },
  {
    to: '/more',
    icon: 'menu',
    label: 'Plus',
  }
];

const Tabs = () =>
  <View style={styles.tabs}>
    {links.map(({ to, icon, label }, i) =>
      <Tab
        key={i}
        to={to}
        icon={icon}
        label={label}
      />
    )}
  </View>
;

export default Tabs;
