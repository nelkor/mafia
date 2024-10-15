import { GameRole, GameTeam } from '../../elementary'
import { EndPhase } from '../types'

export const createEndPhase = (
  roles: GameRole[],
  winner: GameTeam,
): EndPhase => ({
  phase: 'end',
  winner,
  roles,
})
