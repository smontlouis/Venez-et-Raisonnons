import React, { PropTypes } from 'react'
import {
  View,
  Text,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  titleText: {
    fontFamily: '$font.title',
    fontSize: 30,
    marginTop: 20,
  },
  subTitleText: {
    fontFamily: '$font.title_italic',
    color: '$color.darkGrey',
    fontSize: 13,
    lineHeight: 13,
  },
  titleBorder: {
    marginTop: 20,
    marginBottom: 30,
    width: 35,
    height: 3,
    backgroundColor: '$color.primary',
  }
})

const HeaderList = ({ title, subtitle }) => (
  <View>
    <Text style={styles.titleText}>{title}</Text>
    {
      subtitle &&
      <Text style={styles.subTitleText}>{subtitle}</Text>
    }
    <View style={styles.titleBorder} />
  </View>
)


HeaderList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default HeaderList
