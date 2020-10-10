import { useEffect, useState } from 'react'
import { IUser } from '../interfaces'
import { IGameConfig, INITIAL_GAME_CONFIG } from '../constants/game'
import { fireDB } from '../api/config'
import { REALTIME_DB } from '../api/constants'

/**
 * Load all data required by {@link AdminPage}
 */
export function useLoadGameData() {
  const [users, setUsers] = useState<IUser[]>([])
  const [lateUsers, setLateUsers] = useState([])
  const [gameConfig, setGameConfig] = useState<IGameConfig | null>(null)

  useEffect(() => {
    setTimeout(
      () =>
        setGameConfig((prev: IGameConfig | null) => {
          if (prev) {
            return prev
          }
          fireDB
            .ref(REALTIME_DB.GAME_CONFIG)
            .transaction((_: any) => INITIAL_GAME_CONFIG || _)

          return prev
        }),
      2000
    )
    const onChangeUsers = fireDB
      .ref(REALTIME_DB.USERS)
      .on('value', (remoteUsers) => {
        setUsers(remoteUsers.val() || [])
      })

    const onChangeLateUsers = fireDB
      .ref(REALTIME_DB.LATE_USERS)
      .on('value', (remoteUsers) => setLateUsers(remoteUsers.val() || []))

    const onChangeGameConfig = fireDB
      .ref(REALTIME_DB.GAME_CONFIG)
      .on('value', (config) => setGameConfig(config.val() || null))

    return () => {
      fireDB.ref(REALTIME_DB.USERS).off('value', onChangeUsers)
      fireDB.ref(REALTIME_DB.LATE_USERS).off('value', onChangeLateUsers)
      fireDB.ref(REALTIME_DB.GAME_CONFIG).off('value', onChangeGameConfig)
    }
  }, [])

  return { users, lateUsers, gameConfig }
}
