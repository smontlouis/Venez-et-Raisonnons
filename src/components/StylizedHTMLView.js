import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import HTMLView from '../helpers/react-native-htmlview'

const styles = EStyleSheet.create({
  h1: {
    fontFamily: '$font.heading',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 25,
  },
  h2: {
    fontFamily: '$font.heading',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 25,
  },
  p: {
    lineHeight: 23,
    fontSize: 16,
  },
  a: {
    fontWeight: 'bold',
    color: '$color.primary',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '$color.primary',
  },
  li: {
    lineHeight: 10,
  }
})

const StylizedHTMLView = props => (
  <HTMLView
    stylesheet={styles}
    {...props}
  />
)

export default StylizedHTMLView