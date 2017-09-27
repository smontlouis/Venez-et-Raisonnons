import { StackNavigator } from 'react-navigation'

import Topic from '@src/containers/Topic'
import Question from '@src/containers/Question/Question'
import Add from '@src/containers/Add'
import About from '@src/containers/About'
import Astuces from '@src/containers/Astuces'
import BibleSelector from '@src/containers/BibleSelector'
import VersionSelector from '@src/containers/VersionSelector'
import StrongModal from '@src/containers/StrongModal'
import Concordance from '@src/containers/Concordance'
import Search from '@src/containers/Search'
import Login from '@src/containers/Login'
import Register from '@src/containers/Register'
import EditProfile from '@src/containers/EditProfile'
import Favorites from '@src/containers/Favorites'
import Liked from '@src/containers/Liked'
import Read from '@src/containers/Read'
import FavoriteVerses from '@src/containers/FavoriteVerses'
import HighlightVerses from '@src/containers/HighlightVerses'
import Notes from '@src/containers/Notes'
import NewNote from '@src/containers/NewNote'
import EditNote from '@src/containers/EditNote'
import Note from '@src/containers/Note'

import Bible from '@src/containers/MainScreenTabs/Bible'
import MainScreen from '@src/containers/MainScreenTabs/MainScreenNavigator'

const routesConfigs = {
  home: { screen: MainScreen },

  favorites: { screen: Favorites },
  liked: { screen: Liked },
  read: { screen: Read },
  favoriteVerses: { screen: FavoriteVerses },
  highlightVerses: { screen: HighlightVerses },
  notes: { screen: Notes },

  search: { screen: Search },
  add: { screen: Add },
  topic: { screen: Topic },
  question: { screen: Question },
  about: { screen: About },
  astuces: { screen: Astuces },
  login: { screen: Login },
  register: { screen: Register },
  editProfile: { screen: EditProfile },
  bible: { screen: Bible },
  bibleSelector: { screen: BibleSelector },
  versionSelector: { screen: VersionSelector },
  strongModal: { screen: StrongModal },
  concordance: { screen: Concordance },
  newNote: { screen: NewNote },
  editNote: { screen: EditNote },
  note: { screen: Note }
}

const stackNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'home'
}

export default StackNavigator(routesConfigs, stackNavigatorConfig)
