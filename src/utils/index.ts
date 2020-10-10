import { IUser } from '../interfaces'
import { LOGGED_IN_COOKIE } from '../api/constants'
import { ROLE } from '../constants/game'
import { IRealTimeDB } from '../api'

/**
 * Return value stored at {@param itemPath} on {@link localStorage}
 * Or return {@param defaultValue}
 *
 * @param itemPath
 * @param defaultValue
 */
export const getCookieSliceOr = <T>(
  itemPath: string = LOGGED_IN_COOKIE,
  defaultValue: any = null
) => {
  try {
    return JSON.parse(localStorage.getItem(itemPath) || '') as T
  } catch (e) {
    return defaultValue
  }
}

/**
 * Return true if the current logged user is an admin
 */
export const isUserAdmin = () => {
  const user = getCookieSliceOr<IUser>()

  return user?.isAdmin ?? false
}

/**
 * Return the first user with the given {@param uid}
 * @param users
 * @param uid
 */
export const getUserWithId = (users: IUser[], uid: string) => {
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
export const mapGoogleUser = ({
  uid,
  photoURL,
  displayName,
  email,
  isAdmin,
}: any) => {
  return {
    uid,
    photoURL,
    x: 0,
    y: 0,
    displayName,
    email,
    role: ROLE.UNASSIGNED,
    isAdmin: isAdmin ?? false,
  }
}

/**
 * Concat/Add user if user does not exist on the given list, based on the id
 *
 * @param users
 * @param user
 */
export const getOrConcantUser = (users: IUser[] = [], user: IUser): IUser[] => {
  if (!getUserWithId(users, user.uid)) {
    return [...users, mapGoogleUser(user)]
  }
  return users
}

export const updateUserPosition = (
  maybeUser: IUser | null,
  db: IRealTimeDB,
  isBenched: boolean
): IRealTimeDB => {
  if (isBenched) {
    return {
      ...db,
      users: [
        ...(db.users || []),
        getUserWithId(db.lateUsers, maybeUser?.uid!)!,
      ],
      lateUsers: db.lateUsers.filter(
        (user) => !(user && user.uid === maybeUser?.uid)
      ),
    }
  }

  return {
    ...db,
    lateUsers: [
      ...(db.lateUsers || []),
      getUserWithId(db.users, maybeUser?.uid!)!,
    ],
    users: db.users.filter((user) => !(user && user.uid === maybeUser?.uid)),
  }
}
