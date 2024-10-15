import { GamePlayer, GamePhase, GameTeam, GameRole } from '../elementary'

interface MemorizedTargets {
  bodyguard: number
  poisoner: number
  ricochet: number
  doctor: number
  masker: number
}

interface AbstractPhase {
  previousTargets: MemorizedTargets
  players: GamePlayer[]
  phase: GamePhase
  opener: number
}

export interface StartPhase {
  roles: GameRole[]
  phase: 'start'
}

export interface MorningPhase extends AbstractPhase {
  phase: 'morning'
}

export interface DayPhase extends AbstractPhase {
  phase: 'day'
}

export interface EveningPhase extends AbstractPhase {
  phase: 'evening'
}

export interface NightPhase extends AbstractPhase {
  phase: 'night'
}

export interface EndPhase {
  roles: GameRole[]
  winner: GameTeam
  phase: 'end'
}

export type GameState =
  | MorningPhase
  | EveningPhase
  | StartPhase
  | NightPhase
  | DayPhase
  | EndPhase
