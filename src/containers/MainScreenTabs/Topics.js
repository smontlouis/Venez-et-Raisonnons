import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import { View, Text, StatusBar } from 'react-native'
import SnackBar from 'react-native-snackbar-dialog'
import { withLogin } from '@helpers'
import {
  TopicsList,
  ScrollableHeader
} from '@src/components'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
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
@withLogin
export default class Topics extends Component {
  static propTypes = {
    topics: PropTypes.object.isRequired,
    newQuestionsCount: PropTypes.number.isRequired
  }

  componentDidMount () {
    if (!this.props.isLogged) {
      SnackBar.show('Ne perdez pas vos données !', {
        buttonColor: '#FFBC00',
        position: 'top',
        tapToClose: true,
        confirmText: 'Voir',
        onConfirm: () => {
          this.props.navigation.navigate('update')
          SnackBar.dismiss()
        }
      })
    }
  }

  render () {
    const { topics, newQuestionsCount } = this.props
    const renderBadgeText = newQuestionsCount > 1 ? 'nouvelles questions' : 'nouvelle question'

    return (
      <View style={styles.container}>
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
      </View>
    )
  }
}
