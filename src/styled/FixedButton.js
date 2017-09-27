import React from 'react'
import glamorous from 'glamorous-native'
import { Text } from '@ui'

const StyledButton = glamorous.touchableOpacity({
  paddingLeft: 15,
  paddingRight: 15,
  justifyContent: 'center'
})

const BottomButton = ({children, primary, disabled, onPress}) => (
  <StyledButton disabled={disabled} onPress={(e) => !disabled && onPress(e)}>
    <Text
      sansSerif
      medium
      primary={primary}
      disabled={disabled}
    >
      {children}
    </Text>
  </StyledButton>
)

export default BottomButton
