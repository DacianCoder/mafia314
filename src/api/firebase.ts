import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import { COLLECTION, LOGGED_IN_COOKIE } from './constants'
import { ROUTES } from '../constants/routes'

const firebaseConfig = {
  apiKey: 'AIzaSyBOVrsJ8zLV_hNhfvE8eqwj1O-17hcgoH8',
  authDomain: 'mafia314-737ae.firebaseapp.com',
  databaseURL: 'https://mafia314-737ae.firebaseio.com',
  projectId: 'mafia314-737ae',
  storageBucket: 'mafia314-737ae.appspot.com',
  messagingSenderId: '172404444555',
  appId: '1:172404444555:web:4f771094b87db9d247738e',
  measurementId: 'G-YMFFJQF2NT',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const fireDB = firebase.database()

const provider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = (history: any) => {
  return auth.signInWithPopup(provider).then(() => {
    history.push(ROUTES.HOME)
  })
}

export const signOutWithGoogle = (history: any) => {
  auth.signOut().then(() => {
    localStorage.removeItem(LOGGED_IN_COOKIE)
    history.push(ROUTES.WELCOME)
  })
}
// @ts-ignore
export const generateUserDocument = async (user) => {
  if (!user) return

  const userRef = firestore.doc(`${COLLECTION.USERS}/${user.uid}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
      })
    } catch (error) {
      console.error('Error creating user document', error)
    }
  }
  return getUserDocument(user.uid)
}

// @ts-ignore
const getUserDocument = async (uid) => {
  if (!uid) return null
  try {
    const userDocument = await firestore.doc(`${COLLECTION.USERS}/${uid}`).get()

    return {
      uid,
      ...userDocument.data(),
    }
  } catch (error) {
    console.error('Error fetching user', error)
  }
}
