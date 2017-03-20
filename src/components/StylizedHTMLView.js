import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { HTMLView } from '../helpers'

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
  h3: {
    fontFamily: '$font.heading',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 25,
  },
  p: {
    lineHeight: 26,
    fontSize: 18,
  },
  a: {
    // fontWeight: 'bold',
    color: '$color.primary',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '$color.primary',
    fontSize: 18,
  },
  strong: {
    fontSize: 18,
  },
  li: {
    lineHeight: 18,
  },
  ol: {
    flexDirection: 'row',
  },
  ul: {
    flexDirection: 'row',
  }
})

const StylizedHTMLView = props => (
  <HTMLView
    stylesheet={styles}
    {...props}
  />
)

export default StylizedHTMLView
