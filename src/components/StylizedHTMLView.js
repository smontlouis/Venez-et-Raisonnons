import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { HTMLView } from '@src/helpers'

const styles = EStyleSheet.create({
  h1: {
    fontFamily: '$font.heading',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 25,
    color: '$color.black',
  },
  h2: {
    fontFamily: '$font.heading',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 25,
    color: '$color.black',
  },
  h3: {
    fontFamily: '$font.heading',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 25,
    color: '$color.black',
  },
  p: {
    lineHeight: 27,
    fontSize: 16,
    color: '$color.black',
  },
  em: {
    lineHeight: 27,
    fontSize: 16,
    fontStyle: 'italic',
    color: '$color.primaryLighten'
  },
  a: {
    // fontWeight: 'bold',
    color: '$color.primary',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '$color.primary',
    lineHeight: 27,
    fontSize: 16,
  },
  strong: {
    lineHeight: 27,
    fontSize: 16,
    fontWeight: 'bold',
    color: '$color.black',
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
