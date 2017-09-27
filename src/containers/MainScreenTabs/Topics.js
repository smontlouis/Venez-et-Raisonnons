import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import { View, Text, StatusBar } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TopicsList, ScrollableHeader } from '@src/components'
import { Container } from '@src/styled'

const styles = EStyleSheet.create({
  badgeContainer: {
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  badge: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '$color.primary',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  badgeText: {
    color: 'white',
    fontSize: 18,
    fontFamily: '$font.heading',
    backgroundColor: 'transparent'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  }
})

@connect(
  state => ({
    topics: state.getIn(['topics', 'topics']),
    newQuestionsCount: state
      .getIn(['questions', 'newQuestions'])
      .filter(question => question.get('standalone'))
      .count()
  })
)
export default class Topics extends Component {
  static propTypes = {
    topics: PropTypes.object.isRequired,
    newQuestionsCount: PropTypes.number.isRequired
  }

  render () {
    const { topics, newQuestionsCount, navigation } = this.props
    const renderBadgeText = newQuestionsCount > 1 ? 'nouvelles questions' : 'nouvelle question'

    return (
      <Container>
        <StatusBar barStyle='light-content' />
        <ScrollableHeader
          title='Venez Et Raisonnons'
          header={(
            newQuestionsCount
              ? <View style={styles.badgeContainer}>
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
            headerTitle='Venez et Raisonnons'
            topics={topics}
          />
        </ScrollableHeader>
        <ActionButton buttonColor='#C22839' bgColor='rgba(0,0,0,0.3)'>
          <ActionButton.Item buttonColor='rgb(98,113,122)' title='Poser une question' onPress={() => navigation.navigate('add')}>
            <Icon name='add' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='rgb(98,113,122)' title='Rechercher' onPress={() => navigation.navigate('search')}>
            <Icon name='search' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Container>
    )
  }
}
