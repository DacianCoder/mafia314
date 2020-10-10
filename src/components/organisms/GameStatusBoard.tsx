import React from 'react'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { IGameConfig } from '../../constants/game'
import { MapSelector } from './MapSelector'
import { IUser } from '../../interfaces'
import { QASelector } from './QASelector'
import { HackerSelector } from './HackerSelector'
import { StartGame } from './StartGame'
import DynamicFormattedMessage from '../common/ui/DynamicFormattedMessage'
import { DevCountDisplay } from './DevCountDisplay'

export const GameStatusBoard: React.FC<{
  gameConfig: IGameConfig
  users: IUser[]
}> = ({ gameConfig, users }) => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {/* TODO add this stringify as a tooltip in order to debug live */}
      {JSON.stringify(gameConfig, null, 2)}
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid container direction="row" justify="center" alignItems="center">
          <DynamicFormattedMessage id="round" tag={Typography} variant="h6" />:{' '}
          <Typography variant="h6">{gameConfig.round}</Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <DynamicFormattedMessage id="status" tag={Typography} variant="h6" />:
          <DynamicFormattedMessage
            id={`game.${gameConfig.status}`}
            tag={Typography}
            variant="h5"
          />
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <MapSelector gameConfig={gameConfig} />
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <QASelector {...{ users, gameConfig }} />
        <HackerSelector {...{ users, gameConfig }} />
        <DevCountDisplay {...{ users, gameConfig }} />
      </Grid>
      <br />
      <StartGame {...{ users, gameConfig }} />
    </Grid>
  )
}
