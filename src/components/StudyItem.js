import React, { PropTypes, Component } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import {
  Text,
  View,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Link } from '../components'

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 0,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '$color.grey',
  },
  image: {
    width: 72,
    height: 53,
    marginRight: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontFamily: '$font.heading',
    lineHeight: 25,
    fontSize: 25,
  },
})


export default class StudyItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const { id, title } = this.props
    return (
      <Link
        route={'study'}
        params={{ studyId: id }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <Icon name="chevron-thin-right" size={24} color={styles._container.borderBottomColor} />
          </View>
        </View>
      </Link>
    )
  }
}
