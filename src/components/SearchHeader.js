import React, { PropTypes } from 'react'
import { SearchBar } from 'react-native-elements'
import {
  View
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$color.primary',
    height: 84,
  },
})

const SearchHeader = ({ onChangeText, placeholder }) => {
  return (
    <View
      style={styles.container}
    >
      <SearchBar
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
