import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { truncate } from '@src/helpers'
import { pure } from 'recompose'
import { List, QuestionItem, HeaderList } from './index'

const styles = EStyleSheet.create({
  container: {
    paddingTop: 0,
    padding: 20
  }
})

type Props = {
  questions: Object,
  questionsCount?: number,
  headerTitle?: string,
  contentContainerStyle?: number,
  withCounting?: bool
}

const QuestionsList = ({
  questions, headerTitle, questionsCount, contentContainerStyle, withCounting,
  ...props
}: Props) =>
  <List
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

export default pure(QuestionsList)
