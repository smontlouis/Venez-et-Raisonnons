import React, { PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { Back } from 'react-router-native';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import combineStyles from '../helpers/combineStyles';


const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$color.primary',
    height: 64,
    paddingTop: 18,
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerTransparent: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: '100%',
    top: 0,
    left: 0,
  },
  back: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 32,
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: '$font.heading',
    fontSize: 20,
    color: 'white',
  }
});

const Header = ({ title, isTransparent }) => {
  const ContainerStyles = combineStyles({
    container: true,
    containerTransparent: isTransparent,
  }, styles);

  return (
    <View
      style={ContainerStyles}
    >
      {
        title &&
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
          </View>
      }
      <Back
        style={styles.back}
        underlayColor="transparent"
      >
        <Icon name="chevron-thin-left" size={18} color="white" />
      </Back>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  isTransparent: PropTypes.bool,
};

export default Header;
