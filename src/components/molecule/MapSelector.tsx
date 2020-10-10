import React, { useEffect, useState } from 'react'
import {
  createStyles,
  FormControl,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  GAME_NOT_STARTED,
  IGameConfig,
  MAPS_TO_PLAY,
} from '../../constants/game'
import DynamicFormattedMessage from '../common/ui/DynamicFormattedMessage'
import { ElementType } from '../../interfaces'
import { fireDB } from '../../api/config'
import { REALTIME_DB, REALTIME_SLICE } from '../../api/constants'

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

const REALTIME_MAP_SLICE = `${REALTIME_DB.GAME_CONFIG}/${REALTIME_SLICE.GAME_MAP}`

export const MapSelector: React.FC<{ gameConfig: IGameConfig }> = ({
  gameConfig,
}) => {
  const classes = useStyles()
  const [selectedMap, setSelectedMap] = useState<ElementType<
    typeof MAPS_TO_PLAY
  > | null>(null)
  const isGameStarted = gameConfig && gameConfig.round !== GAME_NOT_STARTED
  const changeMap = async (value: ElementType<typeof MAPS_TO_PLAY>) => {
    await fireDB.ref(REALTIME_MAP_SLICE).transaction(() => value)
  }

  useEffect(() => {
    const onChangeMapId = fireDB
      .ref(REALTIME_MAP_SLICE)
      .on('value', (v) => setSelectedMap(v.val()))

    return () => {
      fireDB.ref(REALTIME_MAP_SLICE).off('value', onChangeMapId)
    }
  }, [])

  return (
    <FormControl
      className={classes.formControl}
      disabled={isGameStarted || MAPS_TO_PLAY.length === 1}
    >
      <Select
        value={selectedMap}
        onChange={(e) =>
          changeMap(e.target?.value as ElementType<typeof MAPS_TO_PLAY>)
        }
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {MAPS_TO_PLAY.map((mapId) => (
          <MenuItem id={`map.${mapId}`} key={mapId} value={mapId}>
            <DynamicFormattedMessage id={`map.${mapId}`} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
