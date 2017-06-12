import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { HTMLView, globalVariables } from '@src/helpers'
import { pure } from 'recompose'

const styles = EStyleSheet.create({
  h1: {
    fontFamily: '$font.heading',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 25,
    color: '$color.black'
  },
  h2: {
    fontFamily: '$font.heading',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 25,
    color: '$color.black'
  },
  h3: {
    fontFamily: '$font.heading',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 25,
    color: '$color.black'
  },
  p: {
    color: '$color.black',
    ...globalVariables.textStyle
  },
  em: {
    // fontStyle: 'italic',
    color: '$color.primaryLighten',
    ...globalVariables.textStyle
  },
  a: {
    // fontWeight: 'bold',
    color: '$color.black',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '$color.primary',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '$color.primary',
    ...globalVariables.textStyle
  },
  strong: {
    fontWeight: 'bold',
    color: '$color.black',
    ...globalVariables.textStyle
  },
  li: {
    lineHeight: 18
  },
  ol: {
    flexDirection: 'row'
  },
  ul: {
    flexDirection: 'row'
  }
})

const StylizedHTMLView = props => (
  <HTMLView
    stylesheet={styles}
    {...props}
  />
)

export default pure(StylizedHTMLView)
