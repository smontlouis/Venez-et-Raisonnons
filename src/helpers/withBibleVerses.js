// @flow

import React, { Component } from 'react'
import { loadBible } from '@src/helpers'

import { type Verse } from '../types'
type ClassComponent<P, S> = Class<React$Component<void, P, S>>
type State = {
  isLoading: boolean,
  verses:Array<Verse>
}

const withBibleVerses = <P: Object>(version:string, getVerseIds: (P) => Array<Verse>) => (WrappedComponent: ClassComponent<P, State>): ClassComponent<P, State> => (
  class BibleVerses extends Component {
    state = {
      isLoading: true,
      verses: []
    }

    componentDidMount () {
      const verseIds = getVerseIds(this.props)
      const { Livre, Chapitre } = verseIds[0]
      loadBible(version)
      .then((res) => {
        const versesByChapter = res[Livre][Chapitre]
        const verses:Array<Verse> = Object.keys(versesByChapter)
          .map((v: string) => ({ Verset: Number(v), Texte: versesByChapter[v], Livre: Number(Livre), Chapitre: Number(Chapitre) }))
          .filter(v => verseIds.find(vI => vI.Verset === v.Verset))
        this.setState({ isLoading: false, verses })
      })
    }

    render () {
      const { isLoading, verses } = this.state
      return (
        <WrappedComponent {...this.props} isLoading={isLoading} verses={verses} />
      )
    }
  }
)

export default withBibleVerses
