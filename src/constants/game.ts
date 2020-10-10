import { ElementType } from '../interfaces'

export const GAME_NOT_STARTED = -1
export const FIRST_BASIC_MAP = 'muresHq'

export const MAPS_TO_PLAY = [FIRST_BASIC_MAP] as const

export interface IGameConfig {
  round: number
  mapId: ElementType<typeof MAPS_TO_PLAY>
}

export const INITIAL_GAME_CONFIG: IGameConfig = {
  round: GAME_NOT_STARTED,
  mapId: MAPS_TO_PLAY[0],
}

export enum ROLE {
  UNASSIGNED = -1,
  DEVELOPER = 0,
  QA = 1,
  HACKER = 2,
}
