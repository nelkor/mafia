import { GameRole, GameTeam } from '@core/elementary'

import { EndState } from '../types'

export const createEndState = (
  roles: GameRole[],
  winner: GameTeam,
): EndState => ({
  phase: 'end',
  winner,
  roles,
})
