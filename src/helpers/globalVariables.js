import { Platform } from 'react-native'

export default {
  font: {
    title: (Platform.OS === 'ios') ? 'MetaSerifOT-Bold' : 'metaserif',
    title_italic: (Platform.OS === 'ios') ? 'MetaSerifOT-BookIta' : 'metaserif_light_italic',
    heading: (Platform.OS === 'ios') ? 'Alternate Gothic No3 D' : 'alternategothic',
    text: (Platform.OS === 'ios') ? 'Iowan Old Style' : 'serif',
    text_alternative: 'Arial',
  },
  color: {
    black: 'black',
    white: 'white',
    grey: 'rgb(230,230,230)',
    darkGrey: 'rgba(0,0,0,0.5)',
    primary: '#C22839',
    primaryLighten: 'rgba(194, 40, 57, 0.7)',
    primaryDarken: '#AE2333',
    secondary: '#FFBC00',
    tertiary: 'rgb(98,113,122)',
    tertiaryLighten: 'rgba(99, 113, 122, 0.5)',
    quart: '#1A806F'
  },
  paddingTop: (Platform.OS === 'ios') ? 15 : 10,
  header: {
    height: (Platform.OS === 'ios') ? 64 : 73,
    icon: (Platform.OS === 'ios') ? 5 : 10,
  },
  textStyle: {
    lineHeight: 27,
    fontSize: 18,
    fontFamily: '$font.text'
  }
}

export const itemsPerPage = 20
