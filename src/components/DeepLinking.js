import { Component, PropTypes } from 'react'
import { withNavigation } from '@expo/ex-navigation'
import qs from 'query-string'
import Toast from 'react-native-simple-toast'

import {
  Linking,
} from 'react-native'
import { store } from '@src/App'
import { Router } from '@src/routes'

@withNavigation
export default class DeepLinking extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleOpenURL = ::this.handleOpenURL
  }

  componentWillMount() {
    Linking.getInitialURL().then((url) => {
      if (url) this.handleOpenURL({ url })
    }).catch(() => Toast.show('Lien invalide'))

    Linking.addEventListener('url', this.handleOpenURL)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
  }

  handleOpenURL(e) {
    const { navigator } = this.props
    const url = e.url.replace('venezetraisonnons://', '').split('?')
    const [path, urlParams] = url
    const params = urlParams ? qs.parse(urlParams) : null

    const isQuestion = (path === 'question' && params.questionId)
    const hasQuestion = params.questionId ? store.getState().questions.get('questions').get(params.questionId) : null
    if (isQuestion && hasQuestion) {
      navigator.push(Router.getRoute(path, params))
    } else {
      Toast.show('Lien invalide')
    }
  }

  render() {
    return null
  }
}
