import styledProps from 'styled-props'

const bindStyles = stylesToBind => stylesWithBind => (props, theme) => {
  const glamProps = (key, fallback) => {
    const argument = typeof key === 'function' ? key(theme) : key

    return styledProps(argument, fallback)(props)
  }

  const bindStyles = map =>
    Object.keys(map).reduce((memo, key) => {
      memo[key] = glamProps(map[key], key)

      return memo
    }, {})

  const boundStyles = bindStyles(stylesToBind)

  return stylesWithBind(boundStyles)
}

export default bindStyles
