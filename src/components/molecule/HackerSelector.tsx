import React, { useEffect, useMemo, useState } from 'react'
import {
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GAME_NOT_STARTED, IGameConfig } from '../../constants/game'
import { fireDB } from '../../api/config'
import { REALTIME_DB, REALTIME_SLICE } from '../../api/constants'
import { IUser } from '../../interfaces'
import DynamicFormattedMessage from '../common/ui/DynamicFormattedMessage'

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

const REALTIME_HACKER_SLICE = `${REALTIME_DB.GAME_CONFIG}/${REALTIME_SLICE.GAME_HACKER_COUNT}`

export const HackerSelector: React.FC<{
  gameConfig: IGameConfig
  users: IUser[]
}> = ({ gameConfig, users }) => {
  const classes = useStyles()
  const [selectedHackerCount, setQACount] = useState<number>(1)
  const isGameStarted = gameConfig && gameConfig.round !== GAME_NOT_STARTED
  const changeQACount = async (value: number) => {
    await fireDB.ref(REALTIME_HACKER_SLICE).transaction(() => value)
  }

  const hackerOptions = useMemo(
    () =>
      new Array(Math.max(Math.floor(users.length / 4), 1))
        .fill(null)
        .map((_, index) => index + 1),
    [users]
  )

  useEffect(() => {
    const onChangeMapId = fireDB
      .ref(REALTIME_HACKER_SLICE)
      .on('value', (v) => setQACount(Math.max(v.val(), 1)))

    return () => {
      fireDB.ref(REALTIME_HACKER_SLICE).off('value', onChangeMapId)
    }
  }, [])

  return (
    <FormControl
      disabled={isGameStarted || hackerOptions.length === 1}
      className={classes.formControl}
    >
      <DynamicFormattedMessage id="game.hackers" tag={InputLabel} />
      <Select
        value={selectedHackerCount}
        onChange={(e) => changeQACount(Number(e.target?.value))}
        displayEmpty
        className={classes.selectEmpty}
      >
        {hackerOptions.map((integer) => (
          <MenuItem key={integer} value={integer}>
            {integer}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
