import React, { PropTypes } from 'react'
import {
  View,
  Platform,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  SearchInput,
} from '../components'

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$color.primary',
    height: '$header.height',
    paddingTop: (Platform.OS === 'ios') ? 18 : 23,
  },
})

const SearchHeader = ({ onChangeText, placeholder }) => {
  return (
    <View
      style={styles.container}
    >
      <SearchInput
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  )
}

SearchHeader.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default SearchHeader
