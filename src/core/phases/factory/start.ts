import { GameRole } from '../../elementary'
import { StartPhase } from '../types'

export const createStartPhase = (roles: GameRole[]): StartPhase => ({
  phase: 'start',
  roles,
})
