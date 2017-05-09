import React, { PropTypes, Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { withNavigation } from 'react-navigation'
import { View, StatusBar, Text, ScrollView } from 'react-native'
import getDB from '@src/helpers/database'
import { itemsPerPage } from '@src/helpers/globalVariables'
import { Header, Loading, ConcordanceList, PaginateSlider } from '@src/components'
import GestureRecognizer from '@src/helpers/swipe-gestures'



const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
  },
  total: {
    fontSize: 22,
    fontFamily: '$font.title',
    marginBottom: 15,
  },
  numPage: {
    fontFamily: '$font.heading',
    color: 'rgba(0,0,0,0.5)',
    fontSize: 18,
  }
})

@withNavigation
export default class Concordance extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.getCurrentValue = ::this.getCurrentValue
    this.nextPage = ::this.nextPage
    this.prevPage = ::this.prevPage
  }

  state = {
    isConcordanceLoading: true,
    currentPage: 1,
  }

  componentWillMount() {
    this.DB = getDB()
    this.loadConcordance()
  }

  getCurrentValue(value) {
    this.setState({ currentPage: value })
    this.scrollView.scrollTo({ x: 0, y: 0, animated: false })
  }

  loadConcordance() {
    const { state: { params: { reference, book } } } = this.props.navigation
    this.concordancesTexts = []
    this.setState({ isConcordanceLoading: true })
    const part = book > 39 ? 'LSGSNT2' : 'LSGSAT2'
    this.DB.executeSql(`
      SELECT Livre, Chapitre, Verset, Texte 
      FROM ${part} 
      WHERE Texte LIKE '% ${reference} %' 
      OR Texte LIKE '%(${reference})%'
      OR Texte LIKE '% ${reference}.%'
      OR Texte LIKE '% ${reference},%'

      OR Texte LIKE '% 0${reference} %' 
      OR Texte LIKE '%(0${reference})%'
      OR Texte LIKE '% 0${reference}.%'
      OR Texte LIKE '% 0${reference},%'
      ORDER BY Livre ASC 
    `)
      .then(([results]) => {
        const len = results.rows.length
        for (let i = 0; i < len; i += 1) { this.concordancesTexts.push(results.rows.item(i)) }
        this.setState({ isConcordanceLoading: false })
      })
  }

  prevPage() {
    if (this.state.currentPage !== 1) {
      this.setState({ currentPage: this.state.currentPage - 1 })
    }
  }

  nextPage(nbPages) {
    if (this.state.currentPage !== nbPages) {
      this.setState({ currentPage: this.state.currentPage + 1 })
    }
  }

  render() {
    const {
      navigation: { state: { params: { reference } } },
      navigation,
    } = this.props
    const { isConcordanceLoading } = this.state

    const pages = Math.ceil(this.concordancesTexts.length / itemsPerPage)
    console.log(pages)
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header
          title={`Concordance ${reference}`}
        />
        {
          isConcordanceLoading &&
          <Loading />
        }
        {
          !isConcordanceLoading &&
          <GestureRecognizer
            onSwipeRight={this.prevPage}
            onSwipeLeft={() => this.nextPage(pages)}
            config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={styles.content}
              ref={(r) => { this.scrollView = r }}
            >
              <Text style={styles.total}>
                {this.concordancesTexts.length} occurences
                <Text style={styles.numPage}> (Page {this.state.currentPage}) </Text>
              </Text>
              <ConcordanceList
                currentPage={this.state.currentPage}
                itemsPerPage={itemsPerPage}
                concordanceFor={reference}
                list={this.concordancesTexts}
                navigation={navigation}
              />
            </ScrollView>
            <PaginateSlider
              pages={pages}
              currentPage={this.state.currentPage}
              onSlidingComplete={this.getCurrentValue}
            />
          </GestureRecognizer>
        }
      </View>
    )
  }
}
