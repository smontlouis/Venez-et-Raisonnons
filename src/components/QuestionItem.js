import React, { PropTypes } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
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
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '$color.grey',
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: '$font.heading',
    fontSize: 22,
  },
  icon: {
    color: '$color.primary'
  }
})

const QuestionItem = ({ id, title }) => (
  <Link
    route={'question'}
    params={{ questionId: id }}
  >
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Icon name="md-arrow-round-forward" size={20} color={styles._icon.color} />
      </View>
    </View>
  </Link>
)

QuestionItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default QuestionItem
