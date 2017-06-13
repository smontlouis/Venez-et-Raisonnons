// @flow
import React from 'react'
import { Text, Box } from '@src/styled'
import { Link } from '@src/components'
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
    <Box row marginTop={10} marginBottom={10}>
      <Text secondaryFont secondary>{strong.Code}</Text>
      <Text flex> - {strong.Mot}</Text>
    </Box>
  </Link>
)

export default pure(LexiqueMot)
