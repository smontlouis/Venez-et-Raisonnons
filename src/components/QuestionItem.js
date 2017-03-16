import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
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
    borderColor: '$color.grey',
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 20,
  },
  title: {
    fontFamily: '$font.heading',
    fontSize: 21,
    lineHeight: 24,
  },
  number: {
    color: '$color.primary',
    fontFamily: '$font.heading',
    fontSize: 20,
    lineHeight: 24,
  },
  icon: {
    color: '$color.primary',
  },
  studyIcon: {
    color: '$color.quart',
    marginRight: 5
  }
})

const QuestionItem = ({ number, id, title, hasBeenRead, containerStyle, isStudy }) => (
  <Link
    route={'question'}
    params={{ questionId: id, fromStudy: !!number }}
  >
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        {
          number &&
          <Text style={styles.number}>{number}. </Text>
        }
        {
          isStudy &&
          <MIcon name="description" size={20} style={styles.studyIcon} />
        }
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        {
          hasBeenRead &&
          <Icon name="md-checkmark" size={20} color={isStudy ? 'rgba(26, 128, 111, 0.5)' : 'rgba(194, 40, 57, 0.5)'} />
        }
        {
          !hasBeenRead &&
          <Icon name="md-arrow-round-forward" size={18} color={isStudy ? '#1A806F' : '#C22839'} />
        }
      </View>
    </View>
  </Link>
)

QuestionItem.propTypes = {
  containerStyle: PropTypes.object,
  number: PropTypes.number,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hasBeenRead: PropTypes.bool,
  isStudy: PropTypes.bool,
}

export default connect(
  (state, ownProps) => ({
    hasBeenRead: !!state.app.getIn(['hasBeenRead', ownProps.id])
  }),
)(QuestionItem)
