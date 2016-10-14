import React, { PropTypes } from 'react';
import { Link } from 'react-router-native';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import List from './List';
import TopicItem from './TopicItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const TopicsList = ({ topics }) =>
  <List
    style={styles.container}
    listItems={topics}
    renderRow={
      function ({ id, title, questionsCount }) {
        return (
          <TopicItem
            id={id}
            title={title}
            questionsCount={questionsCount}
            to={`/topics/${id}`}
          />
        );
      }
    }
  />
;

TopicsList.propTypes = {
  topics: PropTypes.object.isRequired,
};

export default TopicsList;
