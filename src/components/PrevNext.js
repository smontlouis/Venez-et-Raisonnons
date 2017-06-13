// @flow
import React from 'react'
import { View, Text } from 'react-native'
import { pure, compose } from 'recompose'
import Icon from 'react-native-vector-icons/Ionicons'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import {
  Link
} from '@src/components'
import { truncate } from '@src/helpers'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '$color.grey'
  },
  centered: {
    flex: 1,
    alignSelf: 'center'
  },
  prev: {
    borderRightWidth: 1,
    borderRightColor: '$color.grey',
    alignItems: 'flex-start'
  },
  prevNext: {
    flex: 1,
    padding: 15,
    paddingBottom: 20,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  prevNextText: {
    lineHeight: 23,
    fontSize: 16,
    color: '$color.primary',
    fontWeight: 'bold',
    paddingBottom: 15
  }
})

type Props = {
  previous?: Object,
  next?: Object
}

const getParentQuestion = (state, props) => state.get('questions').get('questions').get(props.parentId)
const getPrevNextQuestion = (state, props, isNext) => {
  const children = getParentQuestion(state, props).get('children')
  const currentQuestionIndex = children.toArray().findIndex(q => q === props.questionId)

  if (currentQuestionIndex === 0 && !isNext) return null

  const prevNextQuestionIndex = children.get(currentQuestionIndex + (isNext ? 1 : -1))
  return state.get('questions').get('questions').get(prevNextQuestionIndex)
}

const PrevNext = ({ previous, next }: Props) => (
  <View style={styles.container}>
    {
      previous &&
      <Link
        route={'question'}
        params={{ questionId: previous.get('id'), fromStudy: true }}
        style={[styles.prevNext, styles.prev]}
      >
        <Text style={styles.prevNextText}>
          {truncate(previous.get('title'), 50)}
        </Text>
        <Icon name='md-arrow-round-back' size={22} color='#C22839' />
      </Link>
    }
    {
      next &&
      <Link
        route={'question'}
        params={{ questionId: next.get('id'), fromStudy: true }}
        style={styles.prevNext}
      >
        <Text style={styles.prevNextText}>
          {truncate(next.get('title'), 50)}
        </Text>
        <Icon name='md-arrow-round-forward' size={22} color='#C22839' />
      </Link>
    }
  </View>
)

export default compose(
  connect(
    (state, ownProps) => ({
      previous: getPrevNextQuestion(state, ownProps, false),
      next: getPrevNextQuestion(state, ownProps, true)
    })
  ),
  pure
)(PrevNext)
