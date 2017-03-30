import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { verseToStrong } from '@src/helpers'

const styles = EStyleSheet.create({
  container: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    lineHeight: 23,
    fontSize: 16,
  },
  verset: {
    fontSize: 12,
    color: '$color.tertiary',
  },
  versetWrapper: {
    marginTop: 3,
    marginRight: 5,
    marginLeft: 15,
  }
})

class BibleVerse extends Component {

  static propTypes = {
    verse: PropTypes.object.isRequired,
    getPosition: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.getVerseMeasure = ::this.getVerseMeasure
  }

  state = {
    element: null
  }

  componentWillMount() {
    const { verse, getPosition } = this.props
    this.formatVerse(verse)

    if (getPosition) setTimeout(this.getVerseMeasure)
  }

  getVerseMeasure() {
    const { verse, getPosition } = this.props
    this.bibleVerse.measure((x, y, width, height, px, py) => {
      getPosition(verse.Verset, { x, y, width, height, px, py })
    })
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
        {
          Verset &&
          <View style={styles.versetWrapper} ref={(r) => { this.bibleVerse = r }} >
            <Text style={styles.verset}>{Verset}</Text>
          </View>
        }
        <Text style={styles.text}>{this.state.element}</Text>
      </View>
    )
  }
}

export default BibleVerse
