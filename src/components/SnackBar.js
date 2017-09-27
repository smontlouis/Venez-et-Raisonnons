import SnackyBar from 'react-native-snackbar-dialog'

const SnackBar = {
  ...SnackyBar,
  show (title) {
    SnackyBar.show(title, {
      tapToClose: true,
      backgroundColor: '#536068',
      duration: 3000
    })
  }
}

export default SnackBar
