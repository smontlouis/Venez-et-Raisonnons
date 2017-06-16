// @flow
import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import verseToStrong from '@src/helpers/verseToStrong'
import { Text } from '@src/styled'
import { pure } from 'recompose'

import { type Verse } from '../../types'

const styles = EStyleSheet.create({
  container: {
    marginBottom: Platform.OS === 'ios' ? 15 : 10,
    flexDirection: 'row'
  },
  versetWrapper: {
    marginTop: 3,
    marginRight: 5,
    marginLeft: 15
  }
})

@pure
class BibleVerse extends Component {
  props: {
    verse: Verse,
    version: string,
    getPosition: Function
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
    const { verse: { Verset } } = this.props
    return (
      <View style={styles.container}>
        {
          Verset &&
          <View
            style={styles.versetWrapper}
            ref={(r) => { this.bibleVerse = r }}
            collapsable={false}
            onLayout={() => {}}
          >
            <Text tertiary small>{Verset}</Text>
          </View>
        }
        <Text flex>
          {this.state.element}
        </Text>
      </View>
    )
  }
}

export default BibleVerse
