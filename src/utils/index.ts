import { IUser } from '../interfaces'

/**
 * Return value stored at {@param itemPath} on {@link localStorage}
 * Or return {@param defaultValue}
 *
 * @param itemPath
 * @param defaultValue
 */
export const getCookieSliceOr = (
  itemPath: string,
  defaultValue: any = null
) => {
  try {
    return JSON.parse(localStorage.getItem(itemPath) || '')
  } catch (e) {
    return defaultValue
  }
}

/**
 * Return the first user with the given {@param uid}
 * @param users
 * @param uid
 */
const getUserWithId = (users: IUser[], uid: string) => {
  return users?.find((user) => user && uid === user.uid)
}

/**
 * Map firebase auth user to {@link IUser}
 *
 * @param uid
 * @param photoURL
 * @param displayName
 * @param email
 */
export const mapGoogleUser = ({ uid, photoURL, displayName, email }: any) => {
  return { uid, photoURL, x: 0, y: 0, displayName, email }
}

/**
 * Concat/Add user if user does not exist on the given list, based on the id
 *
 * @param users
 * @param user
 */
export function getOrConcantUser(users: IUser[], user: IUser): IUser[] {
  if (!getUserWithId(users, user.uid)) {
    return [...(users || []), mapGoogleUser(user)]
  }
  return users
}
