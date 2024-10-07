export type GameRole =
  | 'sheriff'
  | 'citizen'
  | 'maniac'
  | 'doctor'
  | 'mafia'
  | 'don'

export type GameTeam = 'maniac' | 'mafia' | 'town'

type NightActor = 'sheriff' | 'maniac' | 'doctor' | 'mafia' | 'don'
type EveningStage = 'vote-for-all' | 'speech' | 'info' | 'vote'
type GameTime = 'morning' | 'evening' | 'night' | 'day'
type MorningStage = 'speech' | 'info'

export interface GamePlayer {
  alive: boolean
  role: string
}

interface AbstractState {
  players: GamePlayer[]
  time: GameTime
  round: number
}

interface MorningState extends AbstractState {
  stage: MorningStage
  speeches: number[]
  victims: number[]
  time: 'morning'
}

interface DayState extends AbstractState {
  nominees: Record<number, number>
  speeches: number[]
  time: 'day'
}

interface EveningState extends AbstractState {
  vote: Record<number, number>
  stage: EveningStage
  nominees: number[]
  speeches: number[]
  kicked: number[]
  time: 'evening'
  repeat: boolean
}

interface NightState extends AbstractState {
  targets: {
    maniac: number | null
    doctor: number | null
    mafia: number | null
  }
  found: boolean | null
  act: NightActor[]
  time: 'night'
}

export type GameState = MorningState | EveningState | NightState | DayState
