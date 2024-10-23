import { StateGlobal, GameState } from '../types'

export const validateIndices = (state: GameState, indices: number[]) => {
  if (!indices || !indices.length) {
    throw new Error('Cannot select zero players')
  }

  if (!indices.every(Number.isFinite)) {
    throw new Error('Non-numeric index values')
  }

  const { players } = state as StateGlobal

  if (players) {
    indices.forEach(value => {
      if (!players[value]) {
        throw new Error(`Non-existent player index: ${value}`)
      }
    })
  }
}
