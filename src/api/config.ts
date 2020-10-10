import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'

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

export const firestore = firebase.firestore()
export const fireDB = firebase.database()

export default firebase
