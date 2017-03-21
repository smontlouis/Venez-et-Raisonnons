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
    marginBottom: 20,
    width: 35,
    height: 3,
    backgroundColor: '$color.secondary',
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

const VerseModal = ({ isLoading, title, text, refValue }) => {
  let content

  // To be refactored
  if (!Array.isArray(text)) {
    content = text
  } else {
    content = text.map(t => <Text key={t.verse}> ({t.verse}) {t.text} </Text>)
  }
  return (
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
          <Text style={styles.title}>{title} (DBY)</Text>
          <View style={styles.titleBorder} />
          <Text style={styles.text}>{content}</Text>
        </View>
      }
    </Modal>
  )
}


VerseModal.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.any.isRequired,
  refValue: PropTypes.func.isRequired,
}

export default VerseModal
