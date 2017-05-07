import React, { Component } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import { View, StatusBar, Text, ScrollView } from 'react-native'
import { fromJS } from 'immutable'
import debounce from 'debounce'
import getDB from '@src/helpers/database'
import * as BibleActions from '@src/redux/modules/bible'
import { SearchInput, PaginateList, Loading, PaginateSlider, LexiqueMot } from '@src/components'
import { itemsPerPage } from '@src/helpers/globalVariables'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: EStyleSheet.hairlineWidth,
    shadowOffset: {
      height: EStyleSheet.hairlineWidth,
    },
  },
  scrollView: {
    padding: 20,
  },
  total: {
    fontSize: 22,
    fontFamily: '$font.title',
    marginBottom: 15,
    backgroundColor: 'transparent'
  },
  numPage: {
    fontFamily: '$font.heading',
    color: 'rgba(0,0,0,0.5)',
    fontSize: 18,
  }
})

type LexiqueProps = {
  type: string,
}

@connect(
  (state, ownProps) => ({

  }),
  BibleActions
)
export default class Bible extends Component {

  constructor(props) {
    super(props)

    this.getCurrentValue = ::this.getCurrentValue
    this.filterResults = debounce(::this.filterResults, 500)
  }

  state = {
    currentPage: 1,
    isLoading: true,
    strongCodes: [],
    filter: '',
  }

  componentWillMount() {
    this.DB = getDB()
    this.loadLexique()
  }

  props: LexiqueProps

  loadLexique() {
    const { type } = this.props
    const tmpStrongCodes = []
    this.setState({ isLoading: true })
    this.DB.executeSql(`
      SELECT *
      FROM ${type} 
      WHERE Code != 0
      ORDER BY Mot COLLATE NOCASE
    `)
      .then(([results]) => {
        const len = results.rows.length
        for (let i = 0; i < len; i += 1) { tmpStrongCodes.push(results.rows.item(i)) }
        this.setState({ isLoading: false, strongCodes: tmpStrongCodes })
      })
  }

  filterResults(value) {
    this.setState({ filter: value, currentPage: 1 })
  }

  getCurrentValue(value) {
    this.setState({ currentPage: value })
    this.scrollView.scrollTo({ x: 0, y: 0, animated: false })
  }

  render() {
    const { isLoading, strongCodes, filter } = this.state
    const { type } = this.props

    let filteredStrongCodes

    if (filter) {
      filteredStrongCodes = strongCodes.filter(c =>
        c.Code == filter ||
        c.Mot.toLowerCase().includes(filter.toLowerCase())
      )
    } else {
      filteredStrongCodes = strongCodes
    }

    const pages = Math.ceil(filteredStrongCodes.length / itemsPerPage)
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.searchContainer}>
          <SearchInput
            placeholder="Code strong ou mot"
            onChangeText={this.filterResults}
            isLight
          />
        </View>
        {
          isLoading &&
          <Loading />
        }
        {
          !isLoading &&
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              ref={(r) => { this.scrollView = r }}
            >
              <Text style={styles.total}>
                {
                  (filteredStrongCodes.length < 2) ?
                    `${filteredStrongCodes.length} occurence`
                  : `${filteredStrongCodes.length} occurences`
                }
                <Text style={styles.numPage}> (Page {this.state.currentPage}) </Text>
              </Text>
              <PaginateList
                currentPage={this.state.currentPage}
                list={fromJS(filteredStrongCodes)}
                itemsPerPage={itemsPerPage}
                renderRow={item =>
                  <LexiqueMot
                    strong={item}
                    book={type === 'grec' ? 40 : 1} // If grec, book for LSGSNT2, else LSGSAT2
                  />}
              />
            </ScrollView>
            <PaginateSlider
              pages={pages}
              currentPage={this.state.currentPage}
              onSlidingComplete={this.getCurrentValue}
            />
          </View>
        }
      </View>
    )
  }
}

