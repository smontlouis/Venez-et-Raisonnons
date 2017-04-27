import React, { PropTypes, Component } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import { verseToStrong, globalVariables } from '@src/helpers'

const styles = EStyleSheet.create({
  container: {
    marginBottom: Platform.OS === 'ios' ? 15 : 10,
  },
  title: {
    fontSize: 14,
    color: '$color.primary',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 3,
  },
  text: {
    flex: 1,
    color: '$color.black',
    ...globalVariables.textStyle,
  },
  versetWrapper: {
    marginTop: 3,
    marginRight: 5,
    marginLeft: 15,
  }
})

@connect(
  (state, ownProps) => ({
    book: state.getIn(['bible', 'books'])[ownProps.verse.Livre - 1],
  })
)
class VerseConcordance extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    concordanceFor: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    verse: PropTypes.object.isRequired,
  }

  state = {
    element: null
  }

  componentWillMount() {
    const { verse, concordanceFor } = this.props
    this.formatVerse(verse, concordanceFor)
  }

  componentDidUpdate(oldProps) {
    if ((this.props.verse.Verset !== oldProps.verse.Verset)) {
      const { verse, concordanceFor } = this.props
      this.formatVerse(verse, concordanceFor)
    }
  }

  formatVerse(verse, concordanceFor) {
    verseToStrong(verse, 'STRONG', concordanceFor)
      .then(element => this.setState({ element }))
      .catch(err => console.log(err))
  }

  render() {
    const { book, verse: { Chapitre, Verset }, navigation } = this.props
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('bible', { book, chapter: Chapitre, verse: Verset })}>
        <Text style={styles.title}>{book.Nom} {Chapitre}:{Verset}</Text>
        <Text style={styles.text}>
          {this.state.element}
          </Text>
      </TouchableOpacity>
    )
  }
}

export default VerseConcordance
