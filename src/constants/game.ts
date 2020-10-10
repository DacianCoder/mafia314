import { ElementType } from '../interfaces'

export const GAME_NOT_STARTED = 0
export const GAME_START = 1
export const FIRST_BASIC_MAP = 'muresHq'

export const MAPS_TO_PLAY = [FIRST_BASIC_MAP] as const

export interface IGameConfig {
  round: number
  qaCount: number
  hackerCount: number
  status: GAME_STATUS
  mapId: ElementType<typeof MAPS_TO_PLAY>
}

export enum GAME_STATUS {
  NOT_STARTED = 'notStarted',
  FROZEN = 'frozen',
  RUNNING = 'running',
}

export const INITIAL_GAME_CONFIG: IGameConfig = {
  round: GAME_NOT_STARTED,
  mapId: MAPS_TO_PLAY[0],
  qaCount: 0,
  hackerCount: 1,
  status: GAME_STATUS.NOT_STARTED,
}

export enum ROLE {
  UNASSIGNED = -1,
  DEVELOPER = 0,
  QA = 1,
  HACKER = 2,
}
