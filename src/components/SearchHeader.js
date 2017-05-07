import React, { PropTypes } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  View,
  Platform,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  SearchInput,
  Back,
} from '@src/components'

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$color.primaryDarken',
    height: '$header.height',
    paddingTop: (Platform.OS === 'ios') ? 18 : 23,
    flexDirection: 'row',
  },
  back: {
    height: 32,
    width: 32,
    marginLeft: 10,
    paddingTop: (Platform.OS === 'ios') ? 18 : 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const SearchHeader = ({ onChangeText, placeholder, hasBackButton }) => (
  <View
    style={styles.container}
  >
    {
      hasBackButton &&
      <Back
        style={styles.back}
        underlayColor="transparent"
      >
        <Icon name="chevron-left" size={28} color="white" />
      </Back>
    }
    <SearchInput
      placeholder={placeholder}
      onChangeText={onChangeText}
    />
  </View>
)

SearchHeader.propTypes = {
  hasBackButton: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default SearchHeader
