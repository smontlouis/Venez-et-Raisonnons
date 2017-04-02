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
import {
  Header,
  Loading,
  ConcordanceList,
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
  }
})

@withNavigation
export default class StrongModal extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  state = {
    isConcordanceLoading: true,
  }

  componentWillMount() {
    this.DB = getDB()
    this.loadConcordance()
  }

  loadConcordance() {
    const { route: { params: { reference, book } } } = this.props
    this.concordancesTexts = []
    this.setState({ isConcordanceLoading: true })
    const part = book > 39 ? 'LSGSNT2' : 'LSGSAT2'
    this.DB.executeSql(`SELECT Livre, Chapitre, Verset, Texte FROM ${part} WHERE Texte LIKE '% ${reference}%' OR Texte LIKE '%(${reference}%' ORDER BY Livre ASC`)
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
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.total}>{this.concordancesTexts.length} occurences</Text>
            <ConcordanceList
              concordanceFor={reference}
              list={this.concordancesTexts}
              navigator={navigator}
            />
          </ScrollView>
        }
      </View>
    )
  }
}
