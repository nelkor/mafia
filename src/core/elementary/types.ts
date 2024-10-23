import { GameRole } from './enums'

export interface GamePlayer {
  role: GameRole
  alive: boolean
}
