import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { verseToStrong } from '../../helpers'

const styles = EStyleSheet.create({
  text: {
    lineHeight: 23,
    fontSize: 16,
  },
  verset: {
    fontSize: 12,
    color: '$color.tertiary',
  },
  versetWrapper: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginRight: 5,
  }
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
      <Text style={styles.text}>
        <View style={styles.versetWrapper}>
          <Text style={styles.verset}>{Verset}</Text>
        </View>
        {this.state.element}
      </Text>
    )
  }
}

export default BibleVerse
