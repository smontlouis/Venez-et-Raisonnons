import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  responseContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 25,
    paddingBottom: 25,
  },
  header: {
    padding: 35,
  },
  title: {
    fontFamily: '$font.title',
    color: 'white',
    fontSize: 27,
    lineHeight: 38,
    width: '80%',
    marginTop: 5,
  },
  subTitle: {
    fontFamily: '$font.heading',
    fontSize: 18,
    color: '$color.tertiary',
    marginBottom: 15,
  },
  topic: {
    fontFamily: '$font.heading',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  shareWrapper: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '$color.grey',
    marginTop: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
})

export default styles

// Could use felajs.. seriously.
export function setDynamicFontSize(title) {
  const longTitle = title.length > 100
  return {
    fontSize: longTitle ? 22 : 27,
    lineHeight: longTitle ? 26 : 36,
  }
}
