import { branch } from 'recompose'
import { Loading } from '@components'

export default isLoading =>
  branch(
    isLoading,
    () => Loading
  )
