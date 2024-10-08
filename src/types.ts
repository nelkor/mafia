export type GameRole =
  | 'sheriff'
  | 'citizen'
  | 'maniac'
  | 'doctor'
  | 'mafia'
  | 'don'

export type GameTeam = 'maniac' | 'mafia' | 'town'

export type NightActor = 'sheriff' | 'maniac' | 'doctor' | 'mafia' | 'don'

type EveningStage = 'vote-for-all' | 'speech' | 'info' | 'vote' | 'end'
type GameTime = 'morning' | 'evening' | 'night' | 'day'
type MorningStage = 'speech' | 'info' | 'end'

export interface GamePlayer {
  alive: boolean
  role: GameRole
}

interface AbstractState {
  players: GamePlayer[]
  time: GameTime
  opener: number
}

export interface MorningState extends AbstractState {
  winner: GameTeam | null
  stage: MorningStage
  speeches: number[]
  victims: number[]
  time: 'morning'
}

export interface DayState extends AbstractState {
  nominees: Record<number, number>
  speeches: number[]
  time: 'day'
}

export interface EveningState extends AbstractState {
  vote: Record<number, number[]>
  winner: GameTeam | null
  stage: EveningStage
  nominees: number[]
  speeches: number[]
  kicked: number[]
  time: 'evening'
  repeat: boolean
}

export interface NightTargets {
  sheriff: number | null
  maniac: number | null
  doctor: number | null
  mafia: number | null
  don: number | null
}

export interface NightState extends AbstractState {
  targets: NightTargets
  found: boolean | null
  actors: NightActor[]
  time: 'night'
}

export type GameState = MorningState | EveningState | NightState | DayState
