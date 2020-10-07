import React, { useCallback, useEffect, useMemo, useState } from 'react'
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

  return (
    <Box>
      <h1>you are logged</h1>
      <Box display="flex" justifyContent="center">
        <Paper elevation={4}>
          {users && <GameContainer {...{ users, index }} />}
        </Paper>
      </Box>
    </Box>
  )
}
