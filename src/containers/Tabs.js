import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Octicons';
import {
  TabNavigation,
  TabNavigationItem as TabItem,
  StackNavigation,
} from '@exponent/ex-navigation';
import {
  View,
  Text,
} from 'react-native';
import { Router } from '../routes';

const styles = EStyleSheet.create({
  icon: {
    color: '$color.grey',
  },
  iconActive: {
    color: '$color.secondary',
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTitleText: {
    fontSize: 10,
    color: '$color.darkGrey',
  },
});

const links = [
  {
    to: 'topics',
    icon: 'question-answer',
    label: 'Topics',
  },
  {
    to: 'favorites',
    icon: 'favorite',
    label: 'Favoris',
  },
  {
    to: 'search',
    icon: 'search',
    label: 'Recherche',
  },
  {
    to: 'add',
    icon: 'add-circle',
    label: 'Demander',
  },
  {
    to: 'more',
    icon: 'menu',
    label: 'Plus',
  }
];

const renderIcon = (icon, isSelected) => {
  if (icon === 'search') {
    return (
      <EIcon
        name={icon}
        size={26}
        color={isSelected ? styles._iconActive.color : styles._icon.color}
      />
    );
  }

  return (
    <Icon
      name={icon}
      size={24}
      color={isSelected ? styles._iconActive.color : styles._icon.color}
    />
  );
};


const TabIcon = (label, icon, isSelected) =>
  <View style={styles.tabItemContainer}>
    {renderIcon(icon, isSelected)}
    <Text style={styles.tabTitleText} numberOfLines={1}>
      {label}
    </Text>
  </View>
;

const Tabs = () =>
  <TabNavigation
    id="main"
    navigatorUID="main"
    initialTab="topics"
  >
    {links.map(({ to, icon, label }, i) =>
      <TabItem
        key={i}
        id={to}
        renderIcon={isSelected => TabIcon(label, icon, isSelected)}
      >
        <StackNavigation
          initialRoute={Router.getRoute(to)}
        />
      </TabItem>
    )}
  </TabNavigation>
;

export default Tabs;
