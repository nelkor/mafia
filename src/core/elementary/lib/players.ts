import { GamePlayer } from '../types'
import { GameRole } from '../enums'

export const createPlayer = (role: GameRole): GamePlayer => ({
  alive: true,
  role,
})

export const getGameRoles = (players: GamePlayer[]): GameRole[] =>
  players.map(({ role }) => role)

export const getAliveRoles = (players: GamePlayer[]) =>
  getGameRoles(players.filter(({ alive }) => alive))
