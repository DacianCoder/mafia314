import { IUser } from '../interfaces'
import { IGameConfig, ROLE } from '../constants/game'

const shuffle = <T>(data: T[]) => {
  if (!data) {
    return []
  }
  const array = [...data]
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const assignRoles = (gameConfig: IGameConfig) => {
  let role = ROLE.DEVELOPER
  return (current: IUser, index: number) => {
    if (index < gameConfig.hackerCount) {
      role = ROLE.HACKER
    }
    if (
      index >= gameConfig.hackerCount &&
      index < gameConfig.hackerCount + gameConfig.qaCount
    ) {
      role = ROLE.QA
    }

    return { ...current, role }
  }
}

export const randomiseUserRoles = (
  users: IUser[] = [],
  gameConfig: IGameConfig
) => {
  return shuffle(users).map(assignRoles(gameConfig))
}
