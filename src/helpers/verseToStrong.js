import React from 'react'
import { BibleStrongRef } from '../components'

const verseToStrong = ({ Texte }) => new Promise((resolve) => {
  const splittedTexte = Texte
    .split(/(\d+)/)
    .map((t, i) => {
      if (Number.isInteger(Number(t)) && t !== ' ') {
        return (
          <BibleStrongRef
            reference={Number(t)}
            key={i}
          />
        )
      }

      return t
    })
  resolve(splittedTexte)
})


export default verseToStrong
