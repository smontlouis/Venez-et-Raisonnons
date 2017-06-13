// @flow
import React, { Component } from 'react'
import { ScrollView, View, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import { pure } from 'recompose'
import getDB from '@src/helpers/database'
import { BibleVerse, BibleFooter, Loading } from '@src/components'
import { loadBible } from '@src/helpers'
import * as BibleActions from '@src/redux/modules/bible'

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    padding: 20,
    paddingLeft: 0,
    paddingBottom: 40
  },
  button: {
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 20,
    backgroundColor: 'white',
    borderColor: '$color.primary',
    borderRadius: 5,
    borderWidth: 2
  },
  buttonText: {
    color: '$color.primary'
  }
})

@connect(
  null,
  BibleActions
)
@pure
export default class BibleViewer extends Component {
  props: {
    arrayVerses?: Object,
    book: Object,
    chapter: number,
    goToPrevChapter?: Function,
    goToNextChapter?: Function,
    navigation: Object,
    verse: number,
    version: string
  }

  constructor (props) {
    super(props)

    this.scrollToVerse = ::this.scrollToVerse
    this.onBibleVerseRenderEnd = ::this.onBibleVerseRenderEnd
    this.renderVerses = ::this.renderVerses
  }

  state = {
    isLoading: true,
    verses: []
  }

  componentWillMount () {
    this.DB = getDB()
    setTimeout(() => this.loadVerses(), 0)
  }

  componentDidUpdate (oldProps, oldState) {
    if (
      (this.props.chapter !== oldProps.chapter) ||
      (this.props.book.Numero !== oldProps.book.Numero) ||
      (this.props.version !== oldProps.version)
    ) {
      setTimeout(() => this.loadVerses(), 0)
    }

    // Scroll ONLY when verse change ALONE
    if (
      (this.props.verse !== oldProps.verse) &&
      (this.props.chapter === oldProps.chapter) &&
      (this.props.book.Numero === oldProps.book.Numero)
    ) {
      setTimeout(() => this.scrollToVerse(), 0)
    }
  }

  scrollToVerse () {
    const { verse } = this.props
    if (this.scrollView) {
      try {
        this.scrollView.scrollToIndex({
          index: verse - 1,
          animated: false
        })
      } catch (e) {
        console.log(e)
        this.scrollView.scrollToEnd()
      }
    }
  }

  onBibleVerseRenderEnd (verse) {
    if (verse.Verset == this.filteredArray.length) {
      setTimeout(() => this.scrollToVerse(), 500)
    }
  }

  loadVerses () {
    const { book, chapter, version } = this.props
    let tempVerses
    this.versesMeasure = {}

    if (version === 'STRONG') {
      const part = book.Numero > 39 ? 'LSGSNT2' : 'LSGSAT2'
      this.setState({ isLoading: true })
      this.DB.executeSql(`SELECT * FROM ${part} WHERE LIVRE = ${book.Numero} AND CHAPITRE  = ${chapter}`)
        .then(([results]) => {
          const len = results.rows.length
          tempVerses = []
          for (let i = 0; i < len; i += 1) { tempVerses.push(results.rows.item(i)) }
          this.setState({ isLoading: false, verses: tempVerses })
        })
    } else {
      this.setState({ isLoading: true })
      loadBible(version)
      .then((res) => {
        const versesByChapter = res[book.Numero][chapter]
        tempVerses = []
        tempVerses = Object.keys(versesByChapter)
          .map(v => ({ Verset: v, Texte: versesByChapter[v] }))
        this.setState({ isLoading: false, verses: tempVerses })
      })
    }
  }

  renderVerses () {
    const { version, arrayVerses, book, chapter/*, verse */ } = this.props
    this.filteredArray = this.state.verses

    if (arrayVerses && book.Numero === arrayVerses.book.Numero && chapter === arrayVerses.chapter) {
      this.filteredArray = this.filteredArray.filter(v => arrayVerses.verses.find(aV => aV === Number(v.Verset)))
    }

    return (
      <FlatList
        data={this.filteredArray}
        ref={(r) => { this.scrollView = r }}
        keyExtractor={(item) => `${item.Verset}${item.Livre}${item.Chapitre}`}
        renderItem={({item}) => (
          <BibleVerse
            onRenderEnd={this.onBibleVerseRenderEnd}
            version={version}
            verse={item}
          />
        )}
      />
    )
  }

  render () {
    const { isLoading } = this.state
    const { book, chapter, arrayVerses, navigation, goToPrevChapter, goToNextChapter } = this.props

    if (isLoading) {
      return (<Loading />)
    }

    return (
      <View
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
        >
          {this.renderVerses()}
          {
            !!arrayVerses &&
            <Button
              title='Lire le chapitre entier'
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              onPress={() => navigation.navigate('bible', { hasBack: true, verse: arrayVerses.verses[0] })}
            />
          }
        </ScrollView>
        {
          !arrayVerses &&
          <BibleFooter
            disabled={isLoading}
            book={book}
            chapter={chapter}
            goToPrevChapter={goToPrevChapter}
            goToNextChapter={goToNextChapter}
          />
        }
      </View>
    )
  }
}
