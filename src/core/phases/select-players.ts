import { validateIndices } from './lib/validate-indices'
import { eveningSelect } from './select/evening'
import { nightSelect } from './select/night'
import { daySelect } from './select/day'
import { GameState } from './types'

export const selectPlayers = (
  state: GameState,
  indices: number[],
): GameState => {
  validateIndices(state, indices)

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
