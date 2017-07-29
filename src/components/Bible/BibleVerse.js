// @flow
import React, { Component } from 'react'
import { Platform } from 'react-native'
import glam from 'glamorous-native'
import { pure, compose } from 'recompose'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
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
    width: 30,
    marginRight: 5,
    borderRightWidth: 3,
    borderRightColor: 'transparent',
    alignItems: 'flex-end'
  },
  ({ isHighlight }, theme) => isHighlight ? {
    borderRightColor: theme.colors.secondary
  } : {},
  ({ isSelected }, theme) => isSelected ? {
    borderRightColor: theme.colors.tertiary
  } : {}
)

const NumberText = glam(Text)(
  {
    marginTop: 3,
    paddingRight: 5
  }
)

NumberText.defaultProps = Text.defaultProps

const VerseText = glam(Text)(
  ({ isSelected }, theme) => isSelected ? {
    textDecorationLine: 'underline',
    textDecorationColor: theme.colors.tertiary,
    textDecorationStyle: 'dotted'
  } : {}
)

VerseText.defaultProps = Text.defaultProps

const BookMarkIcon = glam(Icon)({
  marginTop: 5,
  marginRight: 2
})

class BibleVerse extends Component {
  props: {
    isSelected: boolean,
    isHighlighted: boolean,
    isFavorited: boolean,
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
    const { verse: { Verset }, isSelected, isHighlighted, isFavorited } = this.props
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
            <NumberText
              small
              tertiary
            >
              {Verset}
            </NumberText>
            {
              isFavorited &&
              <BookMarkIcon
                name={'bookmark'}
                size={15}
                color='rgba(0,0,0,0.4)'
              />
            }
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
  pure,
  connect(
    (state, { verse: { Livre, Chapitre, Verset } }) => ({
      isSelected: !!state.getIn(['bible', 'selectedVerses', `${Livre}-${Chapitre}-${Verset}`]),
      isHighlighted: !!state.getIn(['user', 'bible', 'highlights', `${Livre}-${Chapitre}-${Verset}`]),
      isFavorited: !!state.getIn(['user', 'bible', 'favorites', `${Livre}-${Chapitre}-${Verset}`])
    }),
    { ...BibleActions }
  )
)(BibleVerse)
