import { GameRole } from '@core/elementary'

import { StartState } from '../types'

export const createStartState = (roles: GameRole[]): StartState => ({
  phase: 'start',
  roles,
})
