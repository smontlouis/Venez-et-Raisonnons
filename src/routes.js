import { StackNavigator } from 'react-navigation'

import Topics from '@src/containers/Topics'
import Studies from '@src/containers/Studies'
import Topic from '@src/containers/Topic'
import Study from '@src/containers/Study'
import Favorites from '@src/containers/Favorites'
import Profile from '@src/containers/Profile'
import More from '@src/containers/More'
import Search from '@src/containers/Search'
import Question from '@src/containers/Question/Question'
import Master from '@src/containers/Master'
import Add from '@src/containers/Add'
import About from '@src/containers/About'
import Bible from '@src/containers/Bible'
import BibleSelector from '@src/containers/BibleSelector'
import VersionSelector from '@src/containers/VersionSelector'
import StrongModal from '@src/containers/StrongModal'
import Modal from '@src/containers/Modal'
import Concordance from '@src/containers/Concordance'


const routesConfigs = {
  home: { screen: Master },
  modal: { screen: Modal },
  topics: { screen: Topics },
  studies: { screen: Studies },
  favorites: { screen: Favorites },
  search: { screen: Search },
  profile: { screen: Profile },
  more: { screen: More },
  topic: { screen: Topic },
  study: { screen: Study },
  add: { screen: Add },
  question: { screen: Question },
  about: { screen: About },

  bible: { screen: Bible },
  bibleSelector: { screen: BibleSelector },
  versionSelector: { screen: VersionSelector },
  strongModal: { screen: StrongModal },
  concordance: { screen: Concordance },
}

const stackNavigatorConfig = {
  headerMode: 'none'
}

export default StackNavigator(routesConfigs, stackNavigatorConfig)
