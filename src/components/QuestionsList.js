import React, { PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { truncate } from '../helpers'

import {
  List,
  QuestionItem,
  HeaderList,
} from './index'

const styles = EStyleSheet.create({
  container: {
    paddingTop: 0,
    padding: 20,
  },
})

const QuestionsList = ({ questions, headerTitle, questionsCount, contentContainerStyle, withCounting, ...props }) =>
  <List
    refreshApp
    listItems={questions}
    renderHeader={() => headerTitle && <HeaderList title={headerTitle} subtitle={`${questionsCount} questions`} />}
    renderRow={
      function ({ id, title, children }, sId, rowID) {
        const number = (Number(rowID) + 1)
        const truncatedTitle = truncate(title, 80)
        return (
          <QuestionItem
            number={withCounting && number}
            isStudy={!!children}
            id={id}
            title={truncatedTitle}
            containerStyle={withCounting && { borderBottomWidth: 0 }}
          />
        )
      }
    }
    contentContainerStyle={[styles.container, contentContainerStyle]}
    {...props}
  />


QuestionsList.propTypes = {
  questions: PropTypes.object.isRequired,
  questionsCount: PropTypes.number,
  headerTitle: PropTypes.string,
  contentContainerStyle: PropTypes.number,
  withCounting: PropTypes.bool,
}

export default QuestionsList
