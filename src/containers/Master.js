import React, { Component, PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EIcon from 'react-native-vector-icons/Octicons'
import { connect } from 'react-redux'
import {
  TabNavigation,
  TabNavigationItem as TabItem,
  StackNavigation,
} from '@exponent/ex-navigation'
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native'
import {
  NoItems,
} from '../components'
import { Router } from '../routes'
import { loadData } from '../redux/modules/app'

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
  },
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
})

const links = [
  {
    to: 'topics',
    icon: 'home',
    label: 'Accueil',
  },
  {
    to: 'favorites',
    icon: 'bookmark',
    label: 'Favoris',
  },
  {
    to: 'add',
    icon: 'add-circle',
    label: 'Poser',
  },
  {
    to: 'search',
    icon: 'search',
    label: 'Chercher',
  },
  {
    to: 'more',
    icon: 'menu',
    label: 'Plus',
  }
]

const renderIcon = (icon, isSelected) => {
  if (icon === 'search') {
    return (
      <EIcon
        name={icon}
        size={24}
        color={isSelected ? styles._iconActive.color : styles._icon.color}
      />
    )
  }

  return (
    <Icon
      name={icon}
      size={27}
      color={isSelected ? styles._iconActive.color : styles._icon.color}
    />
  )
}


const TabIcon = (label, icon, isSelected) =>
  <View style={styles.tabItemContainer}>
    {renderIcon(icon, isSelected)}
    {
      (false && isSelected) &&
      <Text style={styles.tabTitleText} numberOfLines={1}>
        {label.toUpperCase()}
      </Text>
    }
  </View>


@connect(
  state => ({
    topics: state.topics.get('topics'),
    isLoading: state.app.get('isLoading'),
  })
)
class Master extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    topics: PropTypes.object.isRequired,
  }
  componentWillMount() {
    const { dispatch, topics } = this.props
    topics.isEmpty() && dispatch(loadData())
  }

  render() {
    const { topics, isLoading } = this.props

    if (topics.isEmpty() && !isLoading) {
      return (
        <NoItems
          icon="sentiment-dissatisfied"
          text="Pas de connexion"
        />
      )
    }

    if (topics.isEmpty()) {
      return (
        // @TODO - Create a loading component
        <View style={styles.container}>
          <ActivityIndicator style={styles.centered} />
        </View>
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
