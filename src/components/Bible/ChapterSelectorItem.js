import React, { PropTypes } from 'react'
import {
  Text,
  TouchableOpacity,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  chapter: {
    width: 50,
    height: 50,
    margin: 3,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  selectedChapter: {
    backgroundColor: '$color.primary',
  },
  selectedText: {
    color: 'white',
  },
  text: {
    color: 'black',
    fontSize: 16,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent'
  },
})

const ChapterSelectorItem = ({ chapter, isSelected, onChange }) => (
  <TouchableOpacity
    onPress={() => onChange(chapter)}
    style={[styles.chapter, isSelected && styles.selectedChapter]}
  >
    <Text style={[styles.text, isSelected && styles.selectedText]}>
      {chapter}
    </Text>
  </TouchableOpacity>
)


ChapterSelectorItem.propTypes = {
  chapter: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
}

export default ChapterSelectorItem
