import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
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
    flexDirection: 'row',
  },
  title: {
    fontFamily: '$font.heading',
    fontSize: 22,
    lineHeight: 26,
  },
  number: {
    color: '$color.primary',
    fontFamily: '$font.heading',
    fontSize: 20,
    lineHeight: 24,
  },
  icon: {
    color: '$color.primary'
  }
})

const QuestionItem = ({ number, id, title, hasBeenRead }) => (
  <Link
    route={'question'}
    params={{ questionId: id }}
  >
    <View style={styles.container}>
      <View style={styles.content}>
        {
          number &&
          <Text style={styles.number}>{number}. </Text>
        }
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        {
          hasBeenRead &&
          <Icon name="md-checkmark" size={20} color="#2ecc71" />
        }
        {
          !hasBeenRead &&
          <Icon name="md-arrow-round-forward" size={20} color={styles._icon.color} />
        }
      </View>
    </View>
  </Link>
)

QuestionItem.propTypes = {
  number: PropTypes.number,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hasBeenRead: PropTypes.bool,
}

export default connect(
  (state, ownProps) => ({
    hasBeenRead: !!state.app.getIn(['hasBeenRead', ownProps.id])
  }),
)(QuestionItem)
