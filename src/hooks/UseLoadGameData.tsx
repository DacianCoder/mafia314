import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { IGameConfig, INITIAL_GAME_CONFIG } from '../constants/game'
import { fireDB } from '../api/config'
import { REALTIME_DB } from '../api/constants'
import { gameConfigAtom, lateUsersAtom, usersAtom } from '../recoil/atoms'

/**
 * Load all data required by {@link AdminPage}
 */
export function useLoadGameData() {
  const setUsers = useRecoilState(usersAtom)[1]
  const setLateUsers = useRecoilState(lateUsersAtom)[1]
  const setGameConfig = useRecoilState(gameConfigAtom)[1]

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
      .on('value', (config) => {
        setGameConfig((lastGameConfig) => {
          return config.val() || lastGameConfig
        })
      })

    return () => {
      fireDB.ref(REALTIME_DB.USERS).off('value', onChangeUsers)
      fireDB.ref(REALTIME_DB.LATE_USERS).off('value', onChangeLateUsers)
      fireDB.ref(REALTIME_DB.GAME_CONFIG).off('value', onChangeGameConfig)
    }
  }, [])
}
