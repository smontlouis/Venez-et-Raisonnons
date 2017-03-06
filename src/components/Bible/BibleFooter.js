import React, { PropTypes } from 'react'
import {
  Animated,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as BibleActions from '../../redux/modules/bible'

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '$color.grey',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
  }
})

const BibleFooter = ({ book, chapter, scrollY, goToNextChapter, goToPrevChapter, disabled }) => (
  <Animated.View
    style={[
      styles.container,
      { transform: [{ translateY: scrollY }] },
    ]}
  >
    { !(book.Numero === 1 && chapter === 1) &&
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        style={styles.button}
        onPress={goToPrevChapter}
      >
        <Icon
          name={'chevron-left'}
          size={26}
        />
      </TouchableOpacity>
    }
    <View style={{ flex: 1 }} />
    { !(book.Numero === 66 && chapter === 22) &&
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        style={styles.button}
        onPress={goToNextChapter}
      >
        <Icon
          name={'chevron-right'}
          size={26}
        />
      </TouchableOpacity>
    }
  </Animated.View>
)


BibleFooter.propTypes = {
  book: PropTypes.object.isRequired,
  chapter: PropTypes.number.isRequired,
  scrollY: PropTypes.object.isRequired,
  goToPrevChapter: PropTypes.func.isRequired,
  goToNextChapter: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default connect(
  null,
  BibleActions,
)(BibleFooter)
