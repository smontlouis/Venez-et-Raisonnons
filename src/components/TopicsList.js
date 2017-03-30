import React, { PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'

import {
  List,
  TopicItem,
  HeaderList,
} from './index'

const styles = EStyleSheet.create({
  container: {
    paddingTop: 0,
    padding: 20,
  },
})

const TopicsList = ({ headerTitle, topics, contentContainerStyle, ...props }) =>
  <List
    listItems={topics}
    renderHeader={() => headerTitle && <HeaderList title={headerTitle} />}
    renderRow={
      function ({ id, title, image_url: imageUrl }) {
        return (
          <TopicItem
            id={id}
            title={title}
            imageUrl={imageUrl}
          />
        )
      }
    }
    contentContainerStyle={[styles.container, contentContainerStyle]}
    {...props}
  />


TopicsList.propTypes = {
  headerTitle: PropTypes.string,
  topics: PropTypes.object.isRequired,
  contentContainerStyle: PropTypes.number,
}

export default TopicsList
