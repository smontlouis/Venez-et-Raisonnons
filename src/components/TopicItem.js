import React, { PropTypes, Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { View, Image } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import RNFetchBlob from 'react-native-fetch-blob'
import { pure } from 'recompose'

import { Title, Text } from '@src/styled'
import { Link } from '@src/components'
import { saveBase64Image } from '@src/redux/modules/topics'

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
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '$color.primary',
    marginRight: 10
  },
  badgeText: {
    color: 'white',
    lineHeight: 18
  }
})

const getBase64Img = (state, props) => state.get('topics').get('base64Images').get(props.id)
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

@connect(
  (state, ownProps) => ({
    base64Img: getBase64Img(state, ownProps),
    prevImgUrl: getPrevImgUrl(state, ownProps),
    questionsCount: getQuestionsNumberByTopic(state, ownProps),
    newQuestionCount: getNewQuestionsCountByTopic(state, ownProps)
  })
)
@pure
export default class TopicItem extends Component {
  static propTypes = {
    base64Img: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    prevImgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    questionsCount: PropTypes.number.isRequired,
    newQuestionCount: PropTypes.number
  }

  componentWillMount () {
    const { imageUrl, id, dispatch, prevImgUrl, base64Img } = this.props

    if ((imageUrl !== prevImgUrl) || !base64Img) {
      RNFetchBlob.fetch('GET', imageUrl)
      .then((res) => {
        dispatch(saveBase64Image(id, res.base64()))
      })
      .catch(err => console.log(err))
    }
  }

  render () {
    const { id, title, questionsCount, base64Img, newQuestionCount } = this.props

    if (!questionsCount) return null

    return (
      <Link
        route={'topic'}
        params={{ topicId: id }}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: `data:image/gif;base64,${base64Img}` }}
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
        </View>
      </Link>
    )
  }
}
