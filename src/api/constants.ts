export const LOGGED_IN_COOKIE = 'MAFIA314_LOGGED_IN_COOKIE'

/**
 * Collections on Cloud Firestore
 */
export enum COLLECTION {
  USERS = 'users',
}

/**
 * Slices of data on Realtime Database
 */
export enum REALTIME_DB {
  USERS = 'users',
  GAME_CONFIG = 'gameConfig',
  LATE_USERS = 'lateUsers',
}

export enum REALTIME_SLICE {
  GAME_ROUND = 'round',
  GAME_MAP = 'mapId',
}
