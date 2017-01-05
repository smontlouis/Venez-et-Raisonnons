import React, { PropTypes, Component } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import {
  Text,
  View,
  Image,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import RNFetchBlob from 'react-native-fetch-blob'
import { Link } from '../components'

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: 0,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '$color.grey',
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    width: 72,
    height: 53,
    marginRight: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: '$font.heading',
    lineHeight: 30,
    fontSize: 30,
  },
  count: {
    fontFamily: '$font.title_italic',
    color: '$color.darkGrey',
    fontSize: 12,
    lineHeight: 15,
  },
})
export default class TopicItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    questionsCount: PropTypes.number.isRequired,
  }

  componentWillMount() {
    const { imageUrl } = this.props
    RNFetchBlob.fetch('GET', imageUrl)
      .then((res) => {
        console.log(res)
      })
    const prefetchTask = Image.prefetch(imageUrl)
    prefetchTask
      .then(() => {
        console.log('Load Image Success')
      })
      .catch(() => {
        console.log('Load Image Error')
      })
  }

  render() {
    const { id, title, questionsCount, imageUrl } = this.props
    return (
      <Link
        route={'topic'}
        params={{ topicId: id }}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: imageUrl }}
          />
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.count}>{questionsCount} questions</Text>
          </View>
          <View>
            <Icon name="chevron-thin-right" size={24} color={styles._container.borderBottomColor} />
          </View>
        </View>
      </Link>
    )
  }
}
