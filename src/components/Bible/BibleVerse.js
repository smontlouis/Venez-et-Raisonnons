import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
  Platform,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { verseToStrong } from '@src/helpers'

const styles = EStyleSheet.create({
  container: {
    marginBottom: Platform.OS === 'ios' ? 15 : 10,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    lineHeight: Platform.OS === 'ios' ? 23 : 26,
    fontSize: Platform.OS === 'ios' ? 16 :18,
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
    version: PropTypes.string.isRequired,
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
    const { verse, getPosition, version } = this.props

    this.formatVerse(verse, version)
    if (getPosition) setTimeout(this.getVerseMeasure)
  }

  getVerseMeasure() {
    const { verse, getPosition } = this.props
    this.bibleVerse.measure((x, y, width, height, px, py) => {
      getPosition(verse.Verset, { x, y, width, height, px, py })
    })
  }

  formatVerse(verse, version) {
    if (version === 'LSG' || version === 'STRONG') {
      verseToStrong(verse, version)
        .then(element => this.setState({ element }))
        .catch(err => console.log(err))
    } else {
      this.setState({ element: verse.Texte })
    }
  }

  render() {
    const { verse: { Verset } } = this.props
    return (
      <View style={styles.container}>
        {
          Verset &&
          <View
            style={styles.versetWrapper}
            ref={(r) => { this.bibleVerse = r }}
            collapsable={false}
            onLayout={() => {}}
          >
            <Text style={styles.verset}>{Verset}</Text>
          </View>
        }
        <Text style={styles.text}>
          {this.state.element}
          </Text>
      </View>
    )
  }
}

export default BibleVerse
