import React, { PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'

import {
  List,
  TopicItem,
  HeaderList,
} from './index'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
})

const TopicsList = ({ headerTitle, topics, style, ...props }) =>
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
    style={[styles.container, style]}
    {...props}
  />


TopicsList.propTypes = {
  headerTitle: PropTypes.string,
  topics: PropTypes.object.isRequired,
  style: PropTypes.number,
}

export default TopicsList
