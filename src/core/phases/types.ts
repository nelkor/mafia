import { DayNominations } from '@core/features'

import { GamePlayer, GamePhase, GameTeam, GameRole } from '../elementary'

export interface MemorizedTargets {
  bodyguard?: number
  poisoner?: number
  ricochet?: number
  doctor?: number
  masker?: number
}

interface AbstractGameState {
  previousTargets: MemorizedTargets
  players: GamePlayer[]
  phase: GamePhase
  opener: number
}

export type StateGlobal = Omit<AbstractGameState, 'phase'>

export interface StartState {
  roles: GameRole[]
  phase: 'start'
}

export interface MorningState extends AbstractGameState {
  phase: 'morning'
}

export interface DayState extends AbstractGameState {
  wasDisqualification: boolean
  nominations: DayNominations
  speeches: number[]
  phase: 'day'
}

export interface EveningState extends AbstractGameState {
  phase: 'evening'
}

export interface NightState extends AbstractGameState {
  phase: 'night'
}

export interface EndState {
  roles: GameRole[]
  winner: GameTeam
  phase: 'end'
}

export type GameState =
  | MorningState
  | EveningState
  | StartState
  | NightState
  | DayState
  | EndState
