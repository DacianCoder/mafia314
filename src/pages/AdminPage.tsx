import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  createStyles,
  Grid,
  LinearProgress,
  Theme,
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { isUserAdmin } from '../utils'
import { ROUTES } from '../constants/routes'
import { fireDB } from '../api/config'
import { REALTIME_DB } from '../api/constants'
import { IUser } from '../interfaces'
import { UsersList } from '../components/molecule/UsersList'
import DynamicFormattedMessage from '../components/common/ui/DynamicFormattedMessage'
import { IGameConfig, INITIAL_GAME_CONFIG } from '../constants/game'
import { GameStatusBoard } from '../components/molecule/GameStatusBoard'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '200%',
      maxWidth: '56ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  })
)

export function AdminPage() {
  const [users, setUsers] = useState<IUser[]>([])
  const [lateUsers, setLateUsers] = useState([])
  const [gameConfig, setGameConfig] = useState<IGameConfig | null>(null)
  const history = useHistory()

  const classes = useStyles()

  useEffect(() => {
    setTimeout(
      () =>
        setGameConfig(
          (prev: IGameConfig | null) => prev || INITIAL_GAME_CONFIG
        ),
      2000
    )
    const onChangeUsers = fireDB
      .ref(REALTIME_DB.USERS)
      .on('value', (remoteUsers) => setUsers(remoteUsers.val() || []))

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

  if (!isUserAdmin()) {
    history.push(ROUTES.HOME)
    return null
  }

  return (
    <div>
      <Grid>
        <Box marginTop={5}>
          {!gameConfig ? (
            <Box minHeight={300}>
              <LinearProgress />
            </Box>
          ) : (
            <GameStatusBoard gameConfig={gameConfig} />
          )}
        </Box>
      </Grid>
      <Grid>
        <Box display="flex" justifyContent="center">
          <div>
            <Box display="flex" justifyContent="center">
              <DynamicFormattedMessage
                id="users"
                tag={Typography}
                variant="h3"
              />
            </Box>
            <Box border={1} borderRadius={15} padding={1}>
              <UsersList
                classes={classes}
                list={users}
                listResource={REALTIME_DB.USERS}
              />
            </Box>
          </div>
          {lateUsers.length > 0 && (
            <div>
              <Box display="flex" justifyContent="center">
                <DynamicFormattedMessage
                  id="lateUsers"
                  tag={Typography}
                  variant="h3"
                />
              </Box>
              <UsersList
                classes={classes}
                list={lateUsers}
                listResource={REALTIME_DB.LATE_USERS}
              />
            </div>
          )}
        </Box>
      </Grid>
    </div>
  )
}
