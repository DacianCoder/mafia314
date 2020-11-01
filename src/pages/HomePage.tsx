import React from 'react'
import { useRecoilValue } from 'recoil'
import {
  gameConfigAtom,
  lateUsersAtom,
  loggedUserAtom,
  usersAtom,
} from '../recoil/atoms'
import {
  Box,
  Button,
  createStyles,
  Grid,
  LinearProgress,
  Theme,
} from '@material-ui/core'
import DynamicFormattedMessage from '../components/common/ui/DynamicFormattedMessage'
import Typography from '@material-ui/core/Typography'
import { UsersList } from '../components/organisms/UsersList'
import { makeStyles } from '@material-ui/core/styles'
import { GAME_NOT_STARTED } from '../constants/game'
import Game from '../components/Game'
import { getUserWithId, updateUserPosition } from '../utils'
import { fireDB } from '../api/config'
import { IRealTimeDB } from '../api'

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

export function HomePage() {
  const classes = useStyles()
  const gameConfig = useRecoilValue(gameConfigAtom)
  const users = useRecoilValue(usersAtom)
  const lateUsers = useRecoilValue(lateUsersAtom)
  const loggedUser = useRecoilValue(loggedUserAtom)

  if (!gameConfig) {
    return (
      <Box>
        <LinearProgress />
      </Box>
    )
  }

  const isGameStarted = gameConfig && gameConfig.round > GAME_NOT_STARTED
  const isUserBenched = getUserWithId(lateUsers, loggedUser?.uid || '')
  const onSwitch = async () => {
    await fireDB.ref().transaction((db: IRealTimeDB) => {
      if (!db) return null
      return updateUserPosition(loggedUser, db, !!isUserBenched)
    })
  }

  if (isGameStarted) {
    return <Game />
  }

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <DynamicFormattedMessage
          id="welcome"
          tag="h1"
          values={{ name: loggedUser?.displayName }}
        />
      </Box>
      {gameConfig && (
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid container direction="row" justify="center" alignItems="center">
            <DynamicFormattedMessage id="round" tag={Typography} variant="h6" />
            : <Typography variant="h6">{gameConfig.round}</Typography>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <DynamicFormattedMessage
              id="status"
              tag={Typography}
              variant="h6"
            />
            :
            <DynamicFormattedMessage
              id={`game.${gameConfig.status}`}
              tag={Typography}
              variant="h6"
            />
            <DynamicFormattedMessage
              id={`game.${gameConfig.status}`}
              tag={Button}
            />
          </Grid>
        </Grid>
      )}
      <Grid container direction="row" justify="center" alignItems="center">
        {isUserBenched && (
          <div>
            <DynamicFormattedMessage id="question.switchToLobby" />
            <DynamicFormattedMessage
              id="switchToLobby"
              tag={Button}
              onClick={onSwitch}
            />
          </div>
        )}
        {!isUserBenched && (
          <div>
            <DynamicFormattedMessage id="question.switchToBench" />
            <DynamicFormattedMessage
              id="switchToBench"
              tag={Button}
              onClick={onSwitch}
            />
          </div>
        )}
      </Grid>
      <Box display="flex" justifyContent="center">
        <div>
          <Box display="flex" justifyContent="center">
            <DynamicFormattedMessage id="lobby" tag={Typography} variant="h3" />
          </Box>
          <Box border={1} borderRadius={15} padding={1}>
            <UsersList classes={classes} list={users} />
          </Box>
        </div>
        {lateUsers.length > 0 && (
          <div>
            <Box display="flex" justifyContent="center">
              <DynamicFormattedMessage
                id="bench"
                tag={Typography}
                variant="h3"
              />
            </Box>
            <Box border={1} borderRadius={15} padding={1}>
              <UsersList classes={classes} list={lateUsers} />
            </Box>
          </div>
        )}
      </Box>
    </div>
  )
}
