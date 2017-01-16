import React, { PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'

import List from './List'
import TopicItem from './TopicItem'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
})

const TopicsList = ({ topics, style, ...props }) =>
  <List
    listItems={topics}
    renderRow={
      function ({ id, title, image_url: imageUrl, questionsCount }) {
        return (
          <TopicItem
            id={id}
            title={title}
            imageUrl={imageUrl}
            questionsCount={questionsCount}
          />
        )
      }
    }
    style={[styles.container, style]}
    {...props}
  />


TopicsList.propTypes = {
  topics: PropTypes.object.isRequired,
  style: PropTypes.number,
}

export default TopicsList
