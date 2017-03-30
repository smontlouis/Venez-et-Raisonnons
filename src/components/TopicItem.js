import React, { PropTypes, Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {
  Text,
  View,
  Image,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import RNFetchBlob from 'react-native-fetch-blob'
import { Link } from '@src/components'
import { saveBase64Image } from '@src/redux/modules/topics'

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 0,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '$color.grey',
  },
  containerGrey: {
    opacity: 0.3
  },
  image: {
    width: 72,
    height: 53,
    marginRight: 20,
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: '$font.heading',
    lineHeight: 30,
    fontSize: 30,
  },
  count: {
    fontFamily: '$font.title_italic',
    color: '$color.darkGrey',
    fontSize: 12,
  },
})

const getBase64Img = (state, props) => state.get('topics').get('base64Images').get(props.id)
const getCurrentTopic = (state, props) => state.get('topics').get('topics').get(props.id)
const getPrevImgUrl = (state, props) => getCurrentTopic(state, props).get('image_url')
const getQuestions = state => state.get('questions').get('questions')

const getQuestionsNumberByTopic = createSelector(
  [getCurrentTopic, getQuestions],
  (currentTopic, questions) => questions
    .filter(question => question.get('topic') === currentTopic.get('id'))
    .filter(question => question.get('standalone'))
    .count(),
)


@connect(
  (state, ownProps) => ({
    base64Img: getBase64Img(state, ownProps),
    prevImgUrl: getPrevImgUrl(state, ownProps),
    questionsCount: getQuestionsNumberByTopic(state, ownProps),
  }),
)
export default class TopicItem extends Component {
  static propTypes = {
    base64Img: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    prevImgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    questionsCount: PropTypes.number.isRequired,
  }

  componentWillMount() {
    const { imageUrl, id, dispatch, prevImgUrl, base64Img } = this.props

    if ((imageUrl !== prevImgUrl) || !base64Img) {
      RNFetchBlob.fetch('GET', imageUrl)
      .then((res) => {
        dispatch(saveBase64Image(id, res.base64()))
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    const { id, title, questionsCount, base64Img } = this.props

    if (!questionsCount) {
      return null
      // return (
      //   <View style={[styles.container, styles.containerGrey]}>
      //     <Image
      //       style={styles.image}
      //       source={{ uri: `data:image/gif;base64,${base64Img}` }}
      //     />
      //     <View style={styles.content}>
      //       <Text style={styles.title}>{title}</Text>
      //       <Text style={styles.count}>Bientôt disponible</Text>
      //     </View>
      //   </View>
      // )
    }
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
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.count}>{questionsCount} question{questionsCount > 1 ? 's' : ''}</Text>
          </View>
          <View>
            <Icon name="chevron-right" size={26} color="rgba(0,0,0,0.5)" />
          </View>
        </View>
      </Link>
    )
  }
}
