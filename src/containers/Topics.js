import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  View,
  Text,
} from 'react-native'
import {
  TopicsList,
  ScrollableHeader,
} from '@src/components'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  badgeContainer: {
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  badge: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '$color.primary',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  badgeText: {
    color: 'white',
    fontSize: 18,
    fontFamily: '$font.heading',
    backgroundColor: 'transparent',
  }
})


@connect(
  state => ({
    topics: state.getIn(['topics', 'topics']),
    newQuestionsCount: state
      .getIn(['questions', 'newQuestions'])
      .filter(question => question.get('standalone'))
      .count(),
  }),
)
export default class Topics extends Component {
  static propTypes = {
    topics: PropTypes.object.isRequired,
    newQuestionsCount: PropTypes.number.isRequired,
  }

  render() {
    const { topics, newQuestionsCount } = this.props
    
    const renderBadgeText = newQuestionsCount > 1 ? 'nouvelles questions' : 'nouvelle question'

    return (
      <View style={styles.container}>
        <ScrollableHeader
          title="Venez Et Raisonnons"
          header={(
            !!newQuestionsCount ?
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{newQuestionsCount} {renderBadgeText}</Text>
                </View>
              </View>
              : null
          )}
          isHome
          hasBackButton={false}
        >
          <TopicsList
            headerTitle="Venez et Raisonnons"
            topics={topics}
          />
        </ScrollableHeader>
      </View>
    )
  }
}
