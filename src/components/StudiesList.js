import React, { PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { pure } from 'recompose'

import { List, StudyItem, HeaderList } from './index'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
})

const StudiesList = ({ headerTitle, studies, style, ...props }) =>
  <List
    listItems={studies}
    renderHeader={() => headerTitle && <HeaderList title={headerTitle} />}
    renderRow={
      function ({ id, title }) {
        return (
          <StudyItem
            id={id}
            title={title}
          />
        )
      }
    }
    style={[styles.container, style]}
    {...props}
  />


StudiesList.propTypes = {
  headerTitle: PropTypes.string,
  studies: PropTypes.object.isRequired,
  style: PropTypes.number,
}

export default pure(StudiesList)
