import React, { PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'

import {
  List,
  QuestionItem,
  HeaderList,
} from './index'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
})

const QuestionsList = ({ questions, headerTitle, questionsCount, style, withCounting, ...props }) =>
  <List
    listItems={questions}
    renderHeader={() => headerTitle && <HeaderList title={headerTitle} subtitle={`${questionsCount} questions`} />}
    renderRow={
      function ({ id, title }, sId, rowID) {
        return (
          <QuestionItem
            number={withCounting && (Number(rowID) + 1)}
            id={id}
            title={title}
          />
        )
      }
    }
    style={[styles.container, style]}
    {...props}
  />


QuestionsList.propTypes = {
  questions: PropTypes.object.isRequired,
  questionsCount: PropTypes.number,
  headerTitle: PropTypes.string,
  style: PropTypes.number,
}

export default QuestionsList
