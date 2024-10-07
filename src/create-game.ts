import { validateStartRoles, createPlayer } from './utils'
import { GameRole } from './types'

export const createGame = (roles: GameRole[]) => {
  if (!validateStartRoles(roles)) {
    return null
  }

  const players = roles.map(createPlayer)

  return JSON.stringify(players)
}
