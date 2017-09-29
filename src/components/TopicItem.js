// @flow
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { View, Image, Platform } from 'react-native'
import * as Animatable from 'react-native-animatable'
import EStyleSheet from 'react-native-extended-stylesheet'
import RNFetchBlob from 'react-native-fetch-blob'
import { pure, compose } from 'recompose'

import { Title, Text } from '@src/styled'
import { Link } from '@src/components'
import { saveLocalImage } from '@src/redux/modules/topics'

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 0,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '$color.grey'
  },
  containerGrey: {
    opacity: 0.3
  },
  image: {
    width: 72,
    height: 53,
    marginRight: 20,
    borderRadius: 3
  },
  content: {
    flex: 1
  },
  badge: {
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '$color.primary',
    marginRight: 10,
    width: 30,
    height: 30
  },
  badgeText: {
    color: 'white',
    lineHeight: 18,
    textAlign: 'center'
  }
})

const getLocalImagePath = (state, props) => state.get('topics').get('localImages').get(props.id)
const getCurrentTopic = (state, props) => state.getIn(['topics', 'topics']).get(props.id)
const getPrevImgUrl = (state, props) => getCurrentTopic(state, props).get('image_url')
const getQuestions = state => state.getIn(['questions', 'questions'])
const getNewQuestions = state => state.getIn(['questions', 'newQuestions'])

const getNewQuestionsCountByTopic = createSelector(
  [getCurrentTopic, getNewQuestions],
  (currentTopic, questions) => questions
    .filter(question => question.get('topic') === currentTopic.get('id'))
    .filter(question => question.get('standalone'))
    .count()
)

const getQuestionsNumberByTopic = createSelector(
  [getCurrentTopic, getQuestions],
  (currentTopic, questions) => questions
    .filter(question => question.get('topic') === currentTopic.get('id'))
    .filter(question => question.get('standalone'))
    .count()
)

class TopicItem extends Component {
  props: {
    dispatch: Function,
    id: string,
    localImage: string,
    imageUrl: string,
    prevImgUrl?: string,
    title: string,
    questionsCount?: number,
    newQuestionCount?: number
  }

  componentWillMount () {
    const { imageUrl, id, dispatch, prevImgUrl, localImage } = this.props

    RNFetchBlob.fs.exists(localImage)
      .then((exist) => {
        if (!exist || (imageUrl !== prevImgUrl)) {
          RNFetchBlob.config({ fileCache: true, appendExt: 'png' }).fetch('GET', imageUrl)
          .then((res) => {
            dispatch(saveLocalImage(id, res.path()))
          })
          .catch(err => console.log(err))
        }
      })
  }

  render () {
    const { id, title, questionsCount, localImage, imageUrl, newQuestionCount, index } = this.props
    const img = localImage
    ? Platform.OS === 'android' ? `file://${localImage}` : localImage
    : imageUrl

    if (!questionsCount) return null

    return (
      <Link
        route={'topic'}
        params={{ topicId: id }}
      >
        <Animatable.View animation='fadeIn' style={styles.container} delay={200 * index}>
          <Image
            style={styles.image}
            source={{ uri: img }}
          />
          <View style={styles.content}>
            <Title secondaryFont>{title}</Title>
            <Text tertiaryFont small tertiary>{questionsCount} question{questionsCount > 1 ? 's' : ''}</Text>
          </View>
          {
            !!newQuestionCount &&
            <View style={styles.badge}>
              <Text secondaryFont style={styles.badgeText}>{newQuestionCount}</Text>
            </View>
          }
          <View>
            <Icon name='chevron-right' size={26} color='rgba(0,0,0,0.5)' />
          </View>
        </Animatable.View>
      </Link>
    )
  }
}

export default compose(
  pure,
  connect(
    (state, ownProps) => ({
      localImage: getLocalImagePath(state, ownProps),
      prevImgUrl: getPrevImgUrl(state, ownProps),
      questionsCount: getQuestionsNumberByTopic(state, ownProps),
      newQuestionCount: getNewQuestionsCountByTopic(state, ownProps)
    })
  )
)(TopicItem)
