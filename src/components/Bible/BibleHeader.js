import React, { PropTypes, Component } from 'react'
import {
  Platform,
  View,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EStyleSheet from 'react-native-extended-stylesheet'
import bibleStrongText from '../../markdown/bibleStrong'
import {
  Link,
} from '../../components'

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$color.primaryDarken',
    height: '$header.height',
    paddingTop: Platform.OS === 'ios' ? 18 : 24,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
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
        <Link
          route={'modal'}
          params={{ title: 'Qu\'est-ce que la Bible Strong ?', text: bibleStrongText }}
          style={styles.icon}
        >
          <Icon name="help" size={24} color="white" />
        </Link>
      </View>
    )
  }
}
