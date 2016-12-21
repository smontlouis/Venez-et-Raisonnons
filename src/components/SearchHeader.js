import React, { PropTypes } from 'react'
import {
  View
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  SearchInput,
} from '../components'

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$color.primary',
    height: 64,
    paddingTop: 18,
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
