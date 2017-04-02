import React, { PropTypes } from 'react'
import {
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { withNavigation } from '@expo/ex-navigation'

const styles = EStyleSheet.create({
  text: {
    color: '$color.primary',
  },
  textForConcordance: {
    color: '$color.primary',
    fontWeight: 'bold',
    fontSize: 12,
  }
})

const openModal = (navigator, reference, book) => navigator.push('strongModal', { reference, book })

const BibleStrongRef = ({ navigator, reference, book, isFromConcordance }) => (
  <Text
    style={[styles.text, isFromConcordance && styles.textForConcordance]}
    onPress={() => !isFromConcordance && openModal(navigator, reference, book)}
  >
    {isFromConcordance && ' '}
    {reference}
  </Text>
)


BibleStrongRef.propTypes = {
  isFromConcordance: PropTypes.bool,
  navigator: PropTypes.object.isRequired,
  reference: PropTypes.string.isRequired,
  book: PropTypes.number.isRequired,
}

export default withNavigation(BibleStrongRef)
