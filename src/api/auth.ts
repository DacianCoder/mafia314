import { ROUTES } from '../constants/routes'
import { LOGGED_IN_COOKIE } from './constants'
import firebase from './config'

const provider = new firebase.auth.GoogleAuthProvider()

export const auth = firebase.auth()

export const signInWithGoogle = (history: any) => {
  return auth.signInWithPopup(provider).then(() => {
    history.push(ROUTES.HOME)
  })
}

export const signOutWithGoogle = (history: any) => {
  auth.signOut().then(() => {
    localStorage.removeItem(LOGGED_IN_COOKIE)
    history.push(ROUTES.HOME)
  })
}
