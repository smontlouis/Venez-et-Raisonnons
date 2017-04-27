import React, { Component, PropTypes } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EIcon from 'react-native-vector-icons/Octicons'
import { connect } from 'react-redux'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'
import {
  NoItems,
  Loading,
} from '@src/components'
import { loadData } from '@src/redux/modules/app'
import { initDB } from '@src/helpers/database'

import Topics from './Topics'
import Bible from './Bible'
import Search from './Search'
import Favorites from './Favorites'
import More from './More'

const MainScreenNavigator = TabNavigator({
  topics: { screen: Topics },
  bible: { screen: Bible },
  search: { screen: Search },
  favorites: { screen: Favorites },
  more: { screen: More },
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      tabs: {
        topics: {
          barBackgroundColor: '#37474F',
          label: 'Accueil',
          icon: () => (<Icon size={27} color="white" name="home" />)
        },
        bible: {
          barBackgroundColor: '#37474F',
          label: 'Bible',
          icon: () => (<Icon size={27} color="white" name="book-open-page-variant" />)
        },
        search: {
          barBackgroundColor: '#37474F',
          label: 'Chercher',
          icon: () => (<EIcon size={24} color="white" name="search" />)
        },
        favorites: {
          barBackgroundColor: '#37474F',
          label: 'Favoris',
          icon: () => (<Icon size={27} color="white" name="bookmark" />)
        },
        more: {
          barBackgroundColor: '#37474F',
          label: 'Plus',
          icon: () => (<Icon size={27} color="white" name="menu" />)
        },
      }
    }
  }
})

@connect(
  state => ({
    topics: state.getIn(['topics', 'topics']),
    isLoading: state.getIn(['app', 'isLoading']),
  })
)
class Master extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    topics: PropTypes.object.isRequired,
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(loadData())
    initDB()
  }

  render() {
    const { topics, isLoading, dispatch } = this.props

    if (topics.isEmpty() && !isLoading) {
      return (
        <NoItems
          icon="sentiment-dissatisfied"
          text="Pas de connexion"
          buttonTitle="Réessayer"
          buttonAction={() => dispatch(loadData())}
        />
      )
    }

    if (topics.isEmpty()) {
      return (
        <Loading />
      )
    }

    return (
      <MainScreenNavigator />
    )
  }
}

export default Master
