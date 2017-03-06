import React, { PropTypes, Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import * as BibleActions from '../../redux/modules/bible'
import {
  SelectorItem,
} from '../../components'


const styles = EStyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

@connect(
  state => ({
    selectedBook: state.bible.getIn(['temp', 'selectedBook']).toJS(),
    selectedChapter: state.bible.getIn(['temp', 'selectedChapter']),
  }),
  BibleActions,
)
export default class ChapterSelector extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setTempSelectedChapter: PropTypes.func.isRequired,
    selectedBook: PropTypes.object.isRequired,
    selectedChapter: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.onChapterChange = ::this.onChapterChange
  }

  onChapterChange(chapter) {
    this.props.navigation.performAction(({ tabs }) => {
      tabs('sliding-tab-navigation').jumpToTab('verset')
    })
    this.props.setTempSelectedChapter(chapter)
  }

  render() {
    const {
      selectedBook,
      selectedChapter,
    } = this.props

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {[...Array(selectedBook.Chapitres).keys()].map(c =>
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
