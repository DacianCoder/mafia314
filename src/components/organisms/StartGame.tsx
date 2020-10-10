import React from 'react'
import { GAME_START, GAME_STATUS, IGameConfig } from '../../constants/game'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import { Box } from '@material-ui/core'
import { fireDB } from '../../api/config'
import { REALTIME_DB } from '../../api/constants'
import { randomiseUserRoles } from '../../utils/game'
import { useHistory } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export const StartGame: React.FC<{
  gameConfig: IGameConfig
}> = ({ gameConfig }) => {
  const history = useHistory()

  const onStartGame = async () => {
    // TODO Add a confirmation prompt?

    await fireDB
      .ref(REALTIME_DB.USERS)
      .transaction((users) => randomiseUserRoles(users, gameConfig))
    await fireDB.ref(REALTIME_DB.GAME_CONFIG).transaction(
      (config: IGameConfig): IGameConfig => ({
        ...config,
        round: GAME_START,
        status: GAME_STATUS.RUNNING,
      })
    )
    history.push(ROUTES.HOME)
  }

  return (
    <Box>
      <PlayCircleFilledIcon
        color="secondary"
        fontSize="large"
        onClick={onStartGame}
      />
    </Box>
  )
}
