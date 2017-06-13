// @flow
import React from 'react'
import { Text } from 'react-native'
import { pure, compose } from 'recompose'
import EStyleSheet from 'react-native-extended-stylesheet'
import { withNavigation } from 'react-navigation'

const styles = EStyleSheet.create({
  text: {
    color: '$color.primary',
    fontFamily: '$font.text_alternative',
    fontSize: 14
  },
  textForConcordance: {
    color: '$color.primary',
    fontWeight: 'bold',
    fontSize: 12
  }
})

type Props = {
  isFromConcordance?: boolean,
  navigation: Object,
  reference: string,
  book: number
}

const openModal = (navigation, reference, book) => navigation.navigate('strongModal', { reference, book })

const BibleStrongRef = ({ navigation, reference, book, isFromConcordance }: Props) => (
  <Text
    style={[styles.text, isFromConcordance && styles.textForConcordance]}
    onPress={() => !isFromConcordance && openModal(navigation, reference, book)}
  >
    {isFromConcordance && ' '}
    {reference}
  </Text>
)

export default compose(
  withNavigation,
  pure
)(BibleStrongRef)
