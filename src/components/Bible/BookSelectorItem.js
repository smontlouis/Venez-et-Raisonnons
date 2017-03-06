import React, { PropTypes } from 'react'
import {
  Text,
  TouchableOpacity,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  text: {
    color: 'black',
    fontSize: 16,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  selected: {
    color: '$color.primary'
  }
})

const BookSelectorItem = ({ book, isSelected, onChange }) => (
  <TouchableOpacity onPress={() => onChange(book)}>
    <Text style={[styles.text, isSelected && styles.selected]}>
      {book.Nom}
    </Text>
  </TouchableOpacity>
)


BookSelectorItem.propTypes = {
  book: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
}

export default BookSelectorItem
