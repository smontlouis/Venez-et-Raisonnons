import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  View,
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Link } from '../components'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: 'rgba(26, 128, 111, 0.1)',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 3,
  },
  icon: {
    color: '$color.quart',
  },
  text: {
    color: '$color.quart',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  }
})

const LinkToStudy = ({ id, question }) => (
  <Link
    route={'question'}
    params={{ questionId: id }}
  >
    <View style={styles.container}>
      <Icon
        name="description"
        size={32}
        style={styles.icon}
      />
      <Text style={styles.text}>{`Voir l'étude "${question.get('title')}"`}</Text>
      <Icon
        name="chevron-right"
        size={24}
        style={styles.icon}
      />
    </View>
  </Link>
)


LinkToStudy.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
}

export default connect(
  (state, ownProps) => ({
    question: state.questions.getIn(['questions', ownProps.id])
  }),
)(LinkToStudy)
