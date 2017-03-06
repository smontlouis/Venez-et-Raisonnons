import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  Link,
} from '../../components'

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$color.primaryDarken',
    height: 64,
    paddingTop: 18,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    fontFamily: '$font.heading',
    fontSize: 20,
    color: 'white',
  }
})


export default class BibleHeader extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    chapter: PropTypes.number.isRequired,
  }

  render() {
    const { book, chapter } = this.props
    return (
      <View style={styles.container}>
        <Link route={'bibleSelector'} style={styles.titleContainer}>
          <Text style={styles.title}>{book.Nom} {chapter}</Text>
          <Icon
            name="arrow-drop-down"
            size={20}
            color="white"
          />
        </Link>
      </View>
    )
  }
}
