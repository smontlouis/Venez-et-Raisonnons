// @flow
import React from 'react'
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

type Props = {
  item: number,
  onChange: Function,
  isSelected: boolean
}

const SelectorItem = ({ item, isSelected, onChange }: Props) => (
  <TouchableOpacity
    onPress={() => onChange(item)}
    style={[styles.item, isSelected && styles.selectedItem]}
  >
    <Text style={[styles.text, isSelected && styles.selectedText]}>
      {item}
    </Text>
  </TouchableOpacity>
)

export default pure(SelectorItem)
