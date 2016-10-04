import React, { PropTypes } from 'react';
import { Link } from 'react-router-native';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import List from './List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const QuestionsList = ({ questions }) =>
  <List
    listItems={questions}
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
  />
;

QuestionsList.propTypes = {
  questions: PropTypes.object.isRequired,
};

export default QuestionsList;
