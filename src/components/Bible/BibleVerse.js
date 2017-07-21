// @flow
import React, { Component } from 'react'
import { Platform } from 'react-native'
import glam from 'glamorous-native'
import { pure, compose } from 'recompose'
import { connect } from 'react-redux'
import * as BibleActions from '@src/redux/modules/bible'
import verseToStrong from '@src/helpers/verseToStrong'
import { Text } from '@src/styled'

import { type Verse } from '@src/types'

const Container = glam.touchableOpacity({
  marginBottom: Platform.OS === 'ios' ? 15 : 10,
  flexDirection: 'row'
})

const VersetWrapper = glam.view(
  {
    marginTop: 3,
    marginRight: 5,
    marginLeft: 15,
    paddingRight: 3,
    borderRightWidth: 3,
    borderRightColor: 'transparent'
  },
  ({ isHighlight }, theme) => isHighlight ? {
    borderRightColor: theme.colors.secondary
  } : {},
  ({ isSelected }, theme) => isSelected ? {
    borderRightColor: theme.colors.tertiary
  } : {}
)

// const NumberText = glam(Text)(
//   ({ isSelected }, theme) => isSelected ? {
//     color: theme.colors.reverse,
//     backgroundColor: theme.colors.tertiary,
//     borderRadius: 5
//   } : {}
// )

// NumberText.defaultProps = Text.defaultProps

const VerseText = glam(Text)(
  ({ isSelected }, theme) => isSelected ? {
    textDecorationLine: 'underline',
    textDecorationColor: theme.colors.tertiary,
    textDecorationStyle: 'dotted'
  } : {}
  // ({ isHighlight }, theme) => isHighlight ? {
  //   backgroundColor: theme.colors.secondary
  // } : {}
)

VerseText.defaultProps = Text.defaultProps

class BibleVerse extends Component {
  props: {
    isSelected: boolean,
    isHighlighted: boolean,
    verse: Verse,
    version: string,
    getPosition: Function,
    addSelectedVerse: Function,
    removeSelectedVerse: Function
  }

  state = {
    element: ''
  }

  bibleVerse: Object

  componentWillMount () {
    const { verse, getPosition, version } = this.props

    this.formatVerse(verse, version)
    if (getPosition) setTimeout(this.getVerseMeasure)
  }

  onVersePress = () => {
    const { verse: { Livre, Chapitre, Verset }, addSelectedVerse, removeSelectedVerse, isSelected } = this.props

    if (isSelected) {
      removeSelectedVerse(`${Livre}-${Chapitre}-${Verset}`)
    } else {
      addSelectedVerse(`${Livre}-${Chapitre}-${Verset}`)
    }
  }

  getVerseMeasure = () => {
    const { verse, getPosition } = this.props
    if (this.bibleVerse) {
      this.bibleVerse.measure((x, y, width, height, px, py) => {
        getPosition(verse.Verset, { x, y, width, height, px, py })
      })
    }
  }

  formatVerse (verse: Verse, version: string) {
    if (version === 'LSG' || version === 'STRONG') {
      verseToStrong(verse, version)
        .then(element => this.setState({ element }))
        .catch(err => console.log(err))
    } else {
      this.setState({ element: verse.Texte })
    }
  }

  render () {
    const { verse: { Verset }, isSelected, isHighlighted } = this.props
    return (
      <Container onPress={this.onVersePress} activeOpacity={0.8}>
        {
          Verset &&
          <VersetWrapper
            innerRef={(r) => { this.bibleVerse = r }}
            collapsable={false}
            onLayout={() => {}}
            isHighlight={isHighlighted}
            isSelected={isSelected}
          >
            <Text
              small
              tertiary
            >
              {Verset}
            </Text>
          </VersetWrapper>
        }
        <VerseText
          flex
          isHighlight={isHighlighted}
          isSelected={isSelected}
        >
          {this.state.element}
        </VerseText>
      </Container>
    )
  }
}

export default compose(
  connect(
    (state, { verse: { Livre, Chapitre, Verset } }) => ({
      isSelected: !!state.getIn(['bible', 'selectedVerses', `${Livre}-${Chapitre}-${Verset}`]),
      isHighlighted: !!state.getIn(['user', 'bible', 'highlights', `${Livre}-${Chapitre}-${Verset}`])
    }),
    BibleActions
  ),
  pure
)(BibleVerse)
