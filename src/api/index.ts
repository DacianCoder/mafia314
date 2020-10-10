import firebase from 'firebase'
import { COLLECTION, REALTIME_DB } from './constants'
import { fireDB, firestore } from './config'
import { getOrConcantUser, mapGoogleUser } from '../utils'
import { IUser } from '../interfaces'
import { GAME_NOT_STARTED } from '../constants/game'

/**
 * Creates a new user if user hasn't logged in before
 *
 * @param user
 */
export const generateUserDocument = async (user: firebase.User) => {
  if (!user) return

  const userRef = firestore.doc(`${COLLECTION.USERS}/${user.uid}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { uid, email, displayName, photoURL } = user
    try {
      await userRef.set({
        uid,
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

/**
 * Add a given user to either {@link REALTIME_DB.USERS} or {@link REALTIME_DB.LATE_USERS}
 * given the round of the current config
 *
 * @param user
 */
export const registerUserToGame = async (user?: IUser) => {
  if (!user) {
    return
  }
  const config = (await fireDB.ref(REALTIME_DB.GAME_CONFIG).once('value')).val()
  if (!config || config?.round === GAME_NOT_STARTED) {
    await fireDB
      .ref(REALTIME_DB.USERS)
      .transaction((users) => getOrConcantUser(users, user))
    return
  }

  await fireDB
    .ref(REALTIME_DB.LATE_USERS)
    .transaction((lateUsers) => getOrConcantUser(lateUsers, user))
}

/**
 * Retrieve the user stored at {@link COLLECTION.USERS}/id in firestore in order to reuse data
 *
 * @param uid
 */
async function getUserDocument(uid: string): Promise<IUser | undefined> {
  if (!uid) return

  try {
    const userDocument = await firestore.doc(`${COLLECTION.USERS}/${uid}`).get()
    return mapGoogleUser(userDocument.data())
  } catch (error) {
    console.error('Error fetching user', error)
  }
}
