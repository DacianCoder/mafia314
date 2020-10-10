import React from 'react'
import { Box, createStyles, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { IGameConfig } from '../../constants/game'
import { MapSelector } from './MapSelector'

export const GameStatusBoard: React.FC<{ gameConfig: IGameConfig }> = ({
  gameConfig,
}) => {
  return (
    <Box display="flex" justifyContent="center">
      {JSON.stringify(gameConfig, null, 2)}
      <MapSelector gameConfig={gameConfig} />
    </Box>
  )
}
