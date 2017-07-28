import { StackNavigator } from 'react-navigation'

import Topic from '@src/containers/Topic'
import Profile from '@src/containers/Profile'
import Question from '@src/containers/Question/Question'
import Add from '@src/containers/Add'
import About from '@src/containers/About'
import Astuces from '@src/containers/Astuces'
import BibleSelector from '@src/containers/BibleSelector'
import VersionSelector from '@src/containers/VersionSelector'
import StrongModal from '@src/containers/StrongModal'
import Modal from '@src/containers/Modal'
import Concordance from '@src/containers/Concordance'
import Search from '@src/containers/Search'
import Login from '@src/containers/Login'
import Register from '@src/containers/Register'

import More from '@src/containers/MainScreenTabs/More'
import Favorites from '@src/containers/MainScreenTabs/Favorites'
import Bible from '@src/containers/MainScreenTabs/Bible'
import Topics from '@src/containers/MainScreenTabs/Topics'
import MainScreen from '@src/containers/MainScreenTabs/MainScreenNavigator'

const routesConfigs = {
  home: { screen: MainScreen },

  modal: { screen: Modal },
  topics: { screen: Topics },
  favorites: { screen: Favorites },
  search: { screen: Search },
  profile: { screen: Profile },
  more: { screen: More },
  topic: { screen: Topic },
  add: { screen: Add },
  question: { screen: Question },
  about: { screen: About },
  astuces: { screen: Astuces },
  login: { screen: Login },
  register: { screen: Register },

  bible: { screen: Bible },
  bibleSelector: { screen: BibleSelector },
  versionSelector: { screen: VersionSelector },
  strongModal: { screen: StrongModal },
  concordance: { screen: Concordance }
}

const stackNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'home'
}

export default StackNavigator(routesConfigs, stackNavigatorConfig)
