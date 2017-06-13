// @flow
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { pure } from 'recompose'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  text: {
    color: 'black',
    fontSize: 16,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  selected: {
    color: '$color.primary'
  }
})

type Props = {
  book: Object,
  onChange: Function,
  isSelected: boolean
}

const BookSelectorItem = ({ book, isSelected, onChange }: Props) => (
  <TouchableOpacity onPress={() => onChange(book)}>
    <Text style={[styles.text, isSelected && styles.selected]}>
      {book.Nom}
    </Text>
  </TouchableOpacity>
)

export default pure(BookSelectorItem)
