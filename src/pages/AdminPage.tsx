import React from 'react'
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
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore'
import { isUserAdmin } from '../utils'
import { ROUTES } from '../constants/routes'
import { REALTIME_DB } from '../api/constants'
import { UsersList } from '../components/molecule/UsersList'
import DynamicFormattedMessage from '../components/common/ui/DynamicFormattedMessage'
import { GameStatusBoard } from '../components/molecule/GameStatusBoard'
import { useLoadGameData } from '../hooks/UseLoadGameData'
import { fireDB } from '../api/config'
import { INITIAL_GAME_CONFIG } from '../constants/game'

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
  const history = useHistory()
  const classes = useStyles()

  const { users, lateUsers, gameConfig } = useLoadGameData()

  const onHardReset = async () => {
    await fireDB
      .ref(REALTIME_DB.GAME_CONFIG)
      .transaction((_: any) => INITIAL_GAME_CONFIG || _)
  }

  if (!isUserAdmin()) {
    history.push(ROUTES.HOME)
    return null
  }

  return (
    <div>
      <SettingsBackupRestoreIcon onClick={onHardReset} fontSize="large" />
      <Grid>
        <Box marginTop={5}>
          {!gameConfig ? (
            <Box minHeight={300}>
              <LinearProgress />
            </Box>
          ) : (
            <GameStatusBoard {...{ users, gameConfig }} />
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
