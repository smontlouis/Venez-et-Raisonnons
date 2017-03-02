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
import getDB from '../../helpers/database'


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
    book: PropTypes.number.isRequired,
    chapter: PropTypes.number.isRequired,
  }

  state = {
    isLoaded: false
  }

  componentWillMount() {
    this.DB = getDB()
    this.loadName()
  }

  componentDidUpdate(oldProps) {
    if ((this.props.chapter !== oldProps.chapter) || (this.props.book !== oldProps.book)) {
      setTimeout(() => this.loadName(), 0)
    }
  }


  loadName() {
    const { book } = this.props
    this.res = []
    this.setState({ isLoaded: false })
    this.DB.executeSql(`SELECT Nom FROM Livres WHERE Numero = ${book}`)
      .then(([results]) => {
        const len = results.rows.length
        for (let i = 0; i < len; i += 1) { this.res.push(results.rows.item(i)) }
        this.setState({ isLoaded: true })
      })
  }

  render() {
    const { isLoaded } = this.state
    const { chapter } = this.props
    if (!isLoaded) {
      return null
    }
    return (
      <View style={styles.container}>
        <Link route={'bibleSelector'} style={styles.titleContainer}>
          <Text style={styles.title}>{this.res[0].Nom} {chapter}</Text>
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
