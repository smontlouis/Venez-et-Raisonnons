import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { HTMLView } from '@src/helpers'

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
  em: {
    lineHeight: 26,
    fontSize: 18,
    fontStyle: 'italic',
    color: '$color.primaryLighten'
  },
  a: {
    // fontWeight: 'bold',
    color: '$color.primary',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '$color.primary',
    lineHeight: 26,
    fontSize: 18,
  },
  strong: {
    lineHeight: 26,
    fontSize: 18,
    fontWeight: 'bold',
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
