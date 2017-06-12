import React, { PropTypes } from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { pure, compose } from 'recompose'
import { Title, Text } from '@src/styled'


const styles = EStyleSheet.create({
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
    <Title marginTop={20}>{title}</Title>
    {
      subtitle &&
      <Text tertiaryFont small tertiary>{subtitle}</Text>
    }
    <View style={styles.titleBorder} />
  </View>
)


HeaderList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default pure(HeaderList)
