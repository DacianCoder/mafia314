import { atom } from 'recoil'
import { IUser } from '../interfaces'
import { IGameConfig } from '../constants/game'

export const loggedUserAtom = atom<IUser | null>({
  key: 'loggedUser',
  default: null,
})

export const usersAtom = atom<IUser[]>({
  key: 'users',
  default: [],
})

export const lateUsersAtom = atom<IUser[]>({
  key: 'lateUsers',
  default: [],
})

export const gameConfigAtom = atom<IGameConfig | null>({
  key: 'gameConfig',
  default: null,
})
