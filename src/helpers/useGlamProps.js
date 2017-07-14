import styledProps from 'styled-props'

const useGlamProps = stylesWithGlamProps => (props, theme) => {
  const glamProps = (key, fallback) =>
    styledProps(typeof key === 'function' ? key(theme) : key, fallback)(props)

  return stylesWithGlamProps(glamProps, theme)
}

export default useGlamProps
