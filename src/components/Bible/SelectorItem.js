import React, { PropTypes } from 'react'
import {
  Text,
  TouchableOpacity
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { pure } from 'recompose'

const styles = EStyleSheet.create({
  item: {
    width: 50,
    height: 50,
    margin: 3,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  selectedItem: {
    backgroundColor: '$color.primary'
  },
  selectedText: {
    color: 'white'
  },
  text: {
    color: 'black',
    fontSize: 16,
    backgroundColor: 'transparent'
  }
})

const SelectorItem = ({ item, isSelected, onChange }) => (
  <TouchableOpacity
    onPress={() => onChange(item)}
    style={[styles.item, isSelected && styles.selectedItem]}
  >
    <Text style={[styles.text, isSelected && styles.selectedText]}>
      {item}
    </Text>
  </TouchableOpacity>
)

SelectorItem.propTypes = {
  item: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool
}

export default pure(SelectorItem)
