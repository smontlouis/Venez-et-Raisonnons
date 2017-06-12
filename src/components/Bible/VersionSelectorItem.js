import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { pure } from 'recompose'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  text: {
    color: 'black',
    fontSize: 16
  },
  name: {
    color: '$color.tertiary',
    fontSize: 12
  },
  selected: {
    color: '$color.primary',
    fontWeight: 'bold'
  }
})

type Props = {
  version: object,
  onChange: func,
  isSelected?: bool,
}

const VersionSelectorItem = ({ version, isSelected, onChange }: Props) => (
  <TouchableOpacity onPress={() => onChange(version.id)} style={styles.container}>
    <Text style={[styles.text, isSelected && styles.selected]}>
      {version.id}
    </Text>
    <Text style={[styles.name, isSelected && styles.selected]}>{version.name}</Text>
  </TouchableOpacity>
)

export default pure(VersionSelectorItem)
