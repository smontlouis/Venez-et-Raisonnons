import React from 'react'
import { Text, Box } from '@src/styled'
import { Link } from '@src/components'

type Props = {
  strong: Object,
  book: string,
}

export default ({ strong, book }:Props) => (
  <Link
    route={'strongModal'}
    params={{ reference: strong.Code.toString(), book }}
  >
    <Box row marginTop={10} marginBottom={10}>
      <Text secondaryFont secondary>{strong.Code}</Text><Text> - {strong.Mot}</Text>
    </Box>
  </Link>
)
