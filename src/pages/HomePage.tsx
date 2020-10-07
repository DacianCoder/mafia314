import React, { useEffect, useMemo, useState } from 'react'
import { Box, Paper } from '@material-ui/core'
import GameContainer from '../components/game/GameContainer'
import { IUser } from '../models/User'
import { fireDB } from '../api/firebase'
import { LOGGED_IN_COOKIE, REALTIME_DB } from '../api/constants'
import { getCookieSliceOr } from '../utils'

export function HomePage() {
  const [users, setUsers] = useState<IUser[] | null>(null)

  useEffect(() => {
    fireDB.goOnline()
    fireDB
      .ref(REALTIME_DB.USERS)
      .on('value', (snapshot) => setUsers(snapshot.val()))
    return () => {
      fireDB.goOffline()
    }
  }, [])

  const index = useMemo(
    () =>
      users?.findIndex(
        (user) => user.id === getCookieSliceOr(LOGGED_IN_COOKIE)?.id
      ),
    [users?.length]
  )

  useEffect(() => {
    fireDB
      .ref(`${REALTIME_DB.USERS}`)
      .transaction((existingUsers) => {
        const alreadyRegistered = existingUsers?.find(
          (user: { id: any }) =>
            user.id === getCookieSliceOr(LOGGED_IN_COOKIE)?.id
        )
        console.log(alreadyRegistered)
        if (alreadyRegistered) {
          return existingUsers
        }
        return [
          ...(existingUsers ?? []),
          {
            id: getCookieSliceOr(LOGGED_IN_COOKIE)?.id,
            photoURL: getCookieSliceOr(LOGGED_IN_COOKIE)?.photoURL,
            x: (existingUsers?.length ?? 0) * 10,
            y: (existingUsers?.length ?? 0) * 10,
          },
        ]
      })
      .then(() => console.log(`Added user`))
  }, [])

  return (
    <Box>
      <h1>you are logged</h1>
      <Box display="flex" justifyContent="center">
        <Paper elevation={4}>
          {users && users.length && <GameContainer {...{ users, index }} />}
        </Paper>
      </Box>
    </Box>
  )
}
