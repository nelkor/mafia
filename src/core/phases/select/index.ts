import { validateIndices } from '@core/elementary'

import { eveningSelect } from './evening'
import { nightSelect } from './night'
import { GameState } from '../types'
import { daySelect } from './day'

export const selectPlayers = (
  state: GameState,
  indices: number[],
): GameState => {
  if (state.phase === 'start' || state.phase === 'end') {
    throw new Error('No reason to select players')
  }

  validateIndices(state.players, indices)

  switch (state.phase) {
    case 'day':
      return daySelect(state, indices)
    case 'night':
      return nightSelect(state, indices)
    case 'evening':
      return eveningSelect(state, indices)
    default:
      throw new Error('No reason to select players')
  }
}
