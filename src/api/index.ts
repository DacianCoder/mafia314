import firebase from 'firebase'
import { COLLECTION, REALTIME_DB } from './constants'
import { fireDB, firestore } from './config'
import { getOrConcantUser, getUserWithId, mapGoogleUser } from '../utils'
import { IUser } from '../interfaces'
import { GAME_NOT_STARTED, IGameConfig } from '../constants/game'

export interface IRealTimeDB {
  users: IUser[]
  gameConfig: IGameConfig
  lateUsers: IUser[]
}

/**
 * Creates a new user if user hasn't logged in before
 *
 * @param user
 */
export const generateUserDocument = async (user: firebase.User) => {
  if (!user) return null

  const userRef = firestore.doc(`${COLLECTION.USERS}/${user.uid}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { uid, email, displayName, photoURL } = user
    try {
      await userRef.set({
        uid,
        displayName,
        email,
        isAdmin: false,
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
export const registerUserToGame = async (user: IUser | null) => {
  if (!user) {
    return
  }

  await fireDB.ref().transaction((db: IRealTimeDB) => {
    if (!db) {
      return null
    }
    const shouldAddUserToGame =
      !getUserWithId(db.lateUsers, user.uid) &&
      (!db.gameConfig || db.gameConfig?.round === GAME_NOT_STARTED)

    if (shouldAddUserToGame) {
      return { ...db, users: getOrConcantUser(db.users, user) }
    }
    if (getUserWithId(db.users, user.uid)) {
      return db
    }
    return { ...db, lateUsers: getOrConcantUser(db.lateUsers, user) }
  })
}

/**
 * Retrieve the user stored at {@link COLLECTION.USERS}/id in firestore in order to reuse data
 *
 * @param uid
 */
async function getUserDocument(uid: string): Promise<IUser | null> {
  if (!uid) return null

  try {
    const userDocument = await firestore.doc(`${COLLECTION.USERS}/${uid}`).get()
    return mapGoogleUser(userDocument.data())
  } catch (error) {
    console.error('Error fetching user', error)
    return null
  }
}
