import React, { PropTypes } from 'react';
import {
  View
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$color.primary',
    height: 84,
  },
});

const SearchHeader = () => {
  return (
    <View
      style={styles.container}
    />
  );
};

SearchHeader.propTypes = {

};

export default SearchHeader;
