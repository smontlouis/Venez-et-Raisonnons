import React, { PropTypes } from 'react';
import { Link } from 'react-router-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Text,
  View
} from 'react-native';

import List from './List';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontFamily: '$font.title',
    fontSize: 34,
  },
  subTitleText: {
    fontFamily: '$font.title_italic',
    fontSize: 34,
  }
});

function renderHeader(headerTitle) {
  return function () {
    return (
      <View>
        <Text style={styles.titleText}>{headerTitle}</Text>
        <Text style={styles.subTitleText}>{'14 questions'}</Text>
      </View>
    );
  };
}

const QuestionsList = ({ questions, headerTitle, style, ...props }) =>
  <List
    listItems={questions}
    renderHeader={renderHeader(headerTitle)}
    renderRow={
      function ({ id, title }) {
        return (
          <Link to={`/questions/${id}`}>
            <View style={styles.row}>
              <Text style={styles.text}>{title}</Text>
            </View>
          </Link>
        );
      }
    }
    style={[styles.container, style]}
    {...props}
  />
;

QuestionsList.propTypes = {
  questions: PropTypes.object.isRequired,
  headerTitle: PropTypes.string.isRequired,
  style: PropTypes.number,
};

export default QuestionsList;
