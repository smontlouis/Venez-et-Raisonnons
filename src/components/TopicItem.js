import React, { PropTypes } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import {
  Text,
  View,
  Image,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Link } from '../components'

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 28,
    paddingTop: 28,
    paddingLeft: 20,
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

const TopicItem = ({ id, title, questionsCount }) => (
  <Link
    route={'topic'}
    params={{ topicId: id }}
  >
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../static/images/bible.png')}
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

TopicItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  questionsCount: PropTypes.number.isRequired,
}

export default TopicItem
