import {
  Avatar,
  Box,
  GridList,
  GridListTile,
  ListItemText,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import React, { useState } from 'react'
import { IUser } from '../../interfaces'
import { fireDB } from '../../api/config'
import { REALTIME_DB } from '../../api/constants'

export function UsersList({
  classes,
  list,
  listResource,
}: {
  classes: any
  list: IUser[]
  listResource: REALTIME_DB
}) {
  const [hoveredUid, setHoveredUid] = useState<string | null>(null)

  const onRemoveUser = async () => {
    await fireDB
      .ref(listResource)
      .transaction((array) =>
        array.filter(({ uid }: IUser) => hoveredUid !== uid)
      )
  }

  return (
    <GridList className={classes.root}>
      {list.map((user) => (
        <GridListTile key={user.uid} onMouseLeave={() => setHoveredUid(null)}>
          <Box
            display="flex"
            justifyContent="center"
            onMouseOver={() => setHoveredUid(user.uid)}
            onMouseLeave={() => setHoveredUid(null)}
          >
            {(hoveredUid !== user.uid && (
              <Avatar alt={user.displayName} src={user.photoURL} />
            )) || <DeleteIcon onClick={onRemoveUser} />}
          </Box>
          <Box display="flex" justifyContent="center">
            <ListItemText
              primary={user.displayName}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {user.email}
                </Typography>
              }
            />
          </Box>
        </GridListTile>
      ))}
    </GridList>
  )
}
