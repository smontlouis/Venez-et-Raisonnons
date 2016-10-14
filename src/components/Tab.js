import React, { PropTypes } from 'react';
import { Link, withRouter } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  View,
  Text,
} from 'react-native';
import Color from 'color';

import combineStyles from '../helpers/combineStyles';

const styles = EStyleSheet.create({
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
    borderTopWidth: 2,
    borderStyle: 'solid',
    borderTopColor: Color('black').alpha(0.05).rgbString(),
  },
  tabText: {
    fontSize: 11,
    color: '$color.grey',
  },
  tabTextActive: {
    color: '$color.secondary',
  },
});


const Tab = ({ to, icon, label, router }) => {
  const TabTextStyles = combineStyles({
    tabText: true,
    tabTextActive: router.isActive(to),
  }, styles);

  return (
    <Link
      to={to}
      style={styles.tabLink}
      underlayColor="transparent"
      activeOpacity={0.5}
    >
      <View style={styles.tabContainer}>
        <Icon
          name={icon}
          size={24}
          color={!router.isActive(to) ? styles._tabText.color : styles._tabTextActive.color}
        />
        <Text style={TabTextStyles}>{label}</Text>
      </View>
    </Link>
  );
};

Tab.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(Tab);
