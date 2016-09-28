import React, { PropTypes } from 'react';
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import combineStyles from '../helpers/combineStyles';


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

const Tabs = () => {
  const IconStyles = combineStyles({
    tabLink: true,
    tabLinkActive: false,
  }, styles);
  return (
    <View style={styles.tabs}>
      {links.map(({ to, icon, label }, i) =>
        <Link
          key={i}
          to={to}
          style={styles.tabLink}
          underlayColor="transparent"
          activeOpacity={0.5}
        >
          <View style={styles.tabContainer}>
            <Icon name={icon} size={24} color="#BFBFBF" />
            <Text style={styles.tabLinkText}>{label}</Text>
          </View>
        </Link>
      )}
    </View>
  );
};

Tabs.PropTypes = {

};

export default Tabs;
