import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { verseToStrong } from '../../helpers'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
})

class BibleVerse extends Component {

  static propTypes = {
    verse: PropTypes.object.isRequired
  }

  state = {
    element: null
  }

  componentWillMount() {
    const { verse } = this.props
    this.formatVerse(verse)
  }

  formatVerse(verse) {
    verseToStrong(verse)
      .then(element => this.setState({ element }))
      .catch(err => console.log(err))
  }

  render() {
    const { verse: { Verset } } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          <Text>{Verset}</Text>
          {this.state.element}
        </Text>
      </View>
    )
  }
}

export default BibleVerse
