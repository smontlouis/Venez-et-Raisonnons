// @flow
import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { pure, compose } from 'recompose'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as BibleActions from '@src/redux/modules/bible'
import { SelectorItem } from '@src/components'

import { type Book } from '../../types'

const styles = EStyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10
  }
})

class ChapterSelector extends Component {
  props: {
    navigation: Object,
    setTempSelectedChapter: Function,
    selectedBook: Book,
    selectedChapter?: number
  }

  static navigationOptions = {
    tabBarLabel: 'Chapitre'
  }

  onChapterChange = (chapter: number) => {
    this.props.navigation.navigate('verset')
    this.props.setTempSelectedChapter(chapter)
  }

  render () {
    const {
      selectedBook,
      selectedChapter
    } = this.props

    const array = Array(...Array(selectedBook.Chapitres)).map((_, i) => i)

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {array.map(c =>
          <SelectorItem
            key={c}
            item={c + 1}
            isSelected={selectedChapter === (c + 1)}
            onChange={this.onChapterChange}
          />
        )}
      </ScrollView>
    )
  }
}

export default compose(
  pure,
  connect(
    state => ({
      selectedBook: state.getIn(['bible', 'temp', 'selectedBook']).toJS(),
      selectedChapter: state.getIn(['bible', 'temp', 'selectedChapter'])
    }),
    { ...BibleActions }
  )
)(ChapterSelector)
