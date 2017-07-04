// @flow
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { truncate } from '@src/helpers'
import { pure } from 'recompose'
import { FlatList } from 'react-native'
import { QuestionItem, HeaderList } from './index'

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
  <FlatList
    data={Object.values(questions.toJS())}
    ListHeaderComponent={(headerTitle && questionsCount) ? () => <HeaderList title={headerTitle} subtitle={`${questionsCount} questions`} /> : null}
    keyExtractor={(item, index) => item.id}
    renderItem={({ item: { id, title, children }, index }: any) => {
      const number = (Number(index) + 1)
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
    }}
    contentContainerStyle={[styles.container, contentContainerStyle]}
    {...props}
  />

export default pure(QuestionsList)
