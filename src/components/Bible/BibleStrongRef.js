import React, { PropTypes } from 'react'
import {
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { withNavigation } from '@exponent/ex-navigation'

const styles = EStyleSheet.create({
  text: {
    color: '$color.primary',
    // backgroundColor: 'rgba(0,0,0,0.1)',
  },
})

const openModal = (navigator, ref, book) => navigator.push('strongModal', { ref, book })

const BibleStrongRef = ({ navigator, reference, book }) => (
  <Text style={styles.text} onPress={() => openModal(navigator, reference, book)} >
    {reference}
  </Text>
)


BibleStrongRef.propTypes = {
  navigator: PropTypes.object.isRequired,
  reference: PropTypes.number.isRequired,
  book: PropTypes.number.isRequired,
}

export default withNavigation(BibleStrongRef)
