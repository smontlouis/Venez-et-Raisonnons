import React, { Component, PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EIcon from 'react-native-vector-icons/Octicons'
import { connect } from 'react-redux'
import {
  TabNavigation,
  TabNavigationItem as TabItem,
  StackNavigation,
} from '@expo/ex-navigation'
import {
  View,
  Text,
} from 'react-native'
import {
  NoItems,
  Loading,
} from '@src/components'
import { Router } from '@src/routes'
import { loadData } from '@src/redux/modules/app'
import { initDB } from '@src/helpers/database'

const styles = EStyleSheet.create({
  icon: {
    color: 'rgba(99, 113, 122, 0.5)',
  },
  iconActive: {
    color: '$color.secondary',
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTitleText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '$color.secondary',
  }
})

const links = [
  {
    to: 'topics',
    icon: 'home',
    label: 'Accueil',
  },
  {
    to: 'bible',
    icon: 'book-open-page-variant',
    label: 'Bible',
  },
  // {
  //   to: 'add',
  //   icon: 'add-circle',
  //   label: 'Poser',
  // },
  {
    to: 'search',
    icon: 'omega',
    label: 'Lexique',
  },
  // {
  //   to: 'search',
  //   icon: 'search',
  //   label: 'Chercher',
  // },
  {
    to: 'favorites',
    icon: 'bookmark',
    label: 'Favoris',
  },
  {
    to: 'more',
    icon: 'menu',
    label: 'Plus',
  }
]

const renderIcon = (icon, isSelected) => (
  <Icon
    name={icon}
    size={27}
    color={isSelected ? styles._iconActive.color : styles._icon.color}
  />
)



const TabIcon = (label, icon, isSelected) =>
  <View style={styles.tabItemContainer}>
    {renderIcon(icon, isSelected)}
    {
      isSelected &&
      <Text style={styles.tabTitleText} numberOfLines={1}>
        {label.toUpperCase()}
      </Text>
    }
  </View>


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
      <TabNavigation
        id="main"
        navigatorUID="main"
        initialTab="topics"
      >
        {links.map(({ to, icon, label }, i) =>
          <TabItem
            key={i}
            id={to}
            renderIcon={isSelected => TabIcon(label, icon, isSelected)}
          >
            <StackNavigation
              initialRoute={Router.getRoute(to)}
            />
          </TabItem>
        )}
      </TabNavigation>
    )
  }
}

export default Master
