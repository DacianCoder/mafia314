import React from 'react'
import {
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { IGameConfig } from '../../constants/game'
import DynamicFormattedMessage from '../common/ui/DynamicFormattedMessage'
import { IUser } from '../../interfaces'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

export const DevCountDisplay: React.FC<{
  gameConfig: IGameConfig
  users: IUser[]
}> = ({ gameConfig, users }) => {
  const classes = useStyles()
  const devCount = users.length - gameConfig.qaCount - gameConfig.hackerCount

  return (
    <FormControl disabled={true} className={classes.formControl}>
      <DynamicFormattedMessage id="game.devs" tag={InputLabel} />
      <Select
        value={devCount}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value={devCount}>{devCount}</MenuItem>
      </Select>
    </FormControl>
  )
}
