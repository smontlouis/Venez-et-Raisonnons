import React, { PropTypes, Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { withNavigation } from '@expo/ex-navigation'
import {
  View,
  StatusBar,
  Text,
  ScrollView,
} from 'react-native'
import getDB from '@src/helpers/database'
import { itemsPerPage } from '@src/helpers/globalVariables'
import {
  Header,
  Loading,
  ConcordanceList,
  PaginateSlider,
} from '@src/components'


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
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.getCurrentValue = ::this.getCurrentValue
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
    const { route: { params: { reference, book } } } = this.props
    this.concordancesTexts = []
    this.setState({ isConcordanceLoading: true })
    const part = book > 39 ? 'LSGSNT2' : 'LSGSAT2'
    this.DB.executeSql(`
      SELECT Livre, Chapitre, Verset, Texte 
      FROM ${part} 
      WHERE Texte LIKE '% ${reference}%' 
      OR Texte LIKE '%(${reference}%'
      OR Texte LIKE '% 0${reference}%' 
      ORDER BY Livre ASC 
    `)
      .then(([results]) => {
        const len = results.rows.length
        for (let i = 0; i < len; i += 1) { this.concordancesTexts.push(results.rows.item(i)) }
        this.setState({ isConcordanceLoading: false })
      })
  }

  render() {
    const {
      route: { params: { reference } },
      navigator,
    } = this.props
    const { isConcordanceLoading } = this.state

    const pages = Math.ceil(this.concordancesTexts.length / itemsPerPage)

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header
          title={`Concordance ${reference}`}
        />
        {
          isConcordanceLoading &&
          <Loading />
        }
        {
          !isConcordanceLoading &&
          <View style={{ flex: 1 }}>
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
                navigator={navigator}
              />
            </ScrollView>
            <PaginateSlider
              pages={pages}
              onSlidingComplete={this.getCurrentValue}
            />
          </View>
        }
      </View>
    )
  }
}
