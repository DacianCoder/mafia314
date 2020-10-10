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

const REALTIME_QA_SLICE = `${REALTIME_DB.GAME_CONFIG}/${REALTIME_SLICE.GAME_QA_COUNT}`

export const QASelector: React.FC<{
  gameConfig: IGameConfig
  users: IUser[]
}> = ({ gameConfig, users }) => {
  const classes = useStyles()
  const [selectedQACount, setQACount] = useState<number>(0)
  const isGameStarted = gameConfig && gameConfig.round !== GAME_NOT_STARTED

  const changeQACount = async (value: number) => {
    await fireDB.ref(REALTIME_QA_SLICE).transaction(() => value)
  }

  useEffect(() => {
    const onChangeMapId = fireDB
      .ref(REALTIME_QA_SLICE)
      .on('value', (v) => setQACount(Math.max(v.val(), 0)))

    return () => {
      fireDB.ref(REALTIME_QA_SLICE).off('value', onChangeMapId)
    }
  }, [])

  const qaOptions = useMemo(
    () =>
      new Array(Math.max(Math.floor(users.length / 4), 1))
        .fill(null)
        .map((_, index) => index),
    [users]
  )

  return (
    <FormControl
      disabled={isGameStarted || qaOptions.length === 1}
      className={classes.formControl}
    >
      <DynamicFormattedMessage id="game.qa" tag={InputLabel} />
      <Select
        value={selectedQACount}
        onChange={(e) => changeQACount(Number(e.target?.value))}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {qaOptions.map((integer) => (
          <MenuItem key={integer} value={integer}>
            {integer}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
