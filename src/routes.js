import React from 'react'

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation'

import {
  Topics,
  Studies,
  Topic,
  Study,
  Favorites,
  Profile,
  More,
  Search,
  Question,
  Master,
  Add,
  About,
  Bible,
  BibleSelector,
  StrongModal,
  Modal,
} from './containers'

export const Router = createRouter(() => ({
  home: () => Master,
  modal: () => Modal,
  topics: () => Topics,
  studies: () => Studies,
  favorites: () => Favorites,
  search: () => Search,
  profile: () => Profile,
  more: () => More,
  topic: () => Topic,
  study: () => Study,
  add: () => Add,
  question: () => Question,
  about: () => About,

  bible: () => Bible,
  bibleSelector: () => BibleSelector,
  strongModal: () => StrongModal,
}))

export default function () {
  return (
    <NavigationProvider router={Router}>
      <StackNavigation initialRoute={Router.getRoute('home')} />
    </NavigationProvider>
  )
}
