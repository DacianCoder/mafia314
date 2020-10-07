import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import { getCookieSliceOr } from '../../utils'
import { LOGGED_IN_COOKIE, REALTIME_DB } from '../../api/constants'
import { useUpdateEffect } from '../../hooks/useUpdateEffect'
import { fireDB } from '../../api/firebase'
import { IUser } from '../../models/User'

const VELOCITY = 10
const GameContainer: FC<{ users: IUser[]; index?: number }> = ({
  users,
  index,
}) => {
  const canvasRef: MutableRefObject<null> = useRef(null)
  const [currentUser, setCurrentUser] = useState<IUser | null | undefined>(null)

  useEffect(() => {
    setCurrentUser(
      users?.find((user) => user.id === getCookieSliceOr(LOGGED_IN_COOKIE)?.id)
    )
  }, [users])

  const updateMovement = (key: string) => {
    switch (key) {
      case 'd':
        return ['x', 1]
      case 's':
        return ['y', 1]
      case 'w':
        return ['y', -1]
      case 'a':
        return ['x', -1]
      default:
        return null
    }
  }

  const movePlayer = async (e: any) => {
    const value: any = updateMovement(e.key)
    if (!value) {
      return
    }

    await fireDB
      .ref(`${REALTIME_DB.USERS}/${index}/${value[0]}`)
      .transaction((number) => {
        return (number ?? 0) + VELOCITY * value[1]
      })
  }

  const canvasObject: any = canvasRef.current
  const ctx = canvasObject?.getContext('2d')
  if (ctx && users) {
    users.forEach((user) => {
      const img1 = new Image()
      img1.onload = () =>
        ctx.drawImage(img1, 0, 0, 800, 800, user.x, user.y, 50, 50)
      img1.src = getCookieSliceOr(LOGGED_IN_COOKIE)?.photoURL
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', movePlayer)
  }, [])

  useUpdateEffect(() => {
    ctx?.clearRect(0, 0, canvasObject.width, canvasObject.height)
  }, [currentUser, users])
  return <canvas ref={canvasRef} width="640" height="480" />
}

export default GameContainer
