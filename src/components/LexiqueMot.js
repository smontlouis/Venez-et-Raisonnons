// @flow
import React from 'react'
import { Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, Box } from '@ui'
import { Link } from '@components'
import { pure } from 'recompose'

type Props = {
  strong: Object,
  book: number,
}

const LexiqueMot = ({ strong, book }:Props) => (
  <Link
    route={'strongModal'}
    params={{ reference: strong.Code.toString(), book }}
  >
    <Box marginTop={10}>
      <Box row marginBottom={10}>
        <Text secondaryFont secondary>{strong.Code}</Text>
        <Text flex> - {strong.Mot}</Text>
        <Icon name='chevron-right' size={26} color='rgba(0,0,0,0.5)' />
      </Box>
      <Divider />
    </Box>
  </Link>
)

export default pure(LexiqueMot)
