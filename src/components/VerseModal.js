import React, { PropTypes } from 'react'
import Modal from 'react-native-modalbox'
import {
  Text,
  View,
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  Loading,
} from '../components'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: '$font.title',
    fontSize: 20,
  },
  titleBorder: {
    marginTop: 20,
    marginBottom: 40,
    width: 35,
    height: 3,
    backgroundColor: '$color.primary',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '$color.tertiary'
  },

  // Modal
  modal: {
    backgroundColor: '#EFF0F4',
    padding: 20,
    height: '80%'
  },
})

const VerseModal = ({ isLoading, title, text, refValue }) => (
  <Modal
    style={styles.modal}
    backButtonClose
    position="bottom"
    ref={refValue}
  >
    {
      isLoading &&
      <Loading />
    }
    {
      !isLoading &&
      <View>
        <Text style={styles.title}>{title} (LSG)</Text>
        <View style={styles.titleBorder} />
        <Text style={styles.text}>{text}</Text>
      </View>
    }
  </Modal>
)


VerseModal.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  refValue: PropTypes.func.isRequired,
}

export default VerseModal
