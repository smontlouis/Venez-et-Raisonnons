import React, { PropTypes, Component } from 'react'
import { View, Platform, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { verseToStrong } from '@src/helpers'
import { Text } from '@src/styled'

const styles = EStyleSheet.create({
  container: {
    marginBottom: Platform.OS === 'ios' ? 15 : 10,
    flexDirection: 'row',
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

  onVersePress() {
    console.log('presse')
  }

  getVerseMeasure() {
    const { verse, getPosition } = this.props
    if (this.bibleVerse) {
      this.bibleVerse.measure((x, y, width, height, px, py) => {
        getPosition(verse.Verset, { x, y, width, height, px, py })
      })
    }
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
      <TouchableOpacity style={styles.container} onPress={this.onVersePress}>
        {
          Verset &&
          <View
            style={styles.versetWrapper}
            ref={(r) => { this.bibleVerse = r }}
            collapsable={false}
            onLayout={() => {}}
          >
            <Text tertiary small>{Verset}</Text>
          </View>
        }{}
        <Text
          flex
        >
          {this.state.element}
        </Text>
      </TouchableOpacity>
    )
  }
}

export default BibleVerse
