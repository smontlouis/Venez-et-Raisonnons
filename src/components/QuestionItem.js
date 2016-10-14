import React, { PropTypes } from 'react';
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '$color.grey',
    paddingRight: 20,
    paddingTop: 25,
    paddingBottom: 25,
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
});

const QuestionItem = ({ id, title }) => (
  <Link
    to={`/questions/${id}`}
    underlayColor="transparent"
    activeOpacity={0.5}
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
);

QuestionItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default QuestionItem;
