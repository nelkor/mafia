import { GamePlayer } from '@core/elementary'

export const validateIndices = (players: GamePlayer[], indices: number[]) => {
  if (!indices || !indices.length) {
    throw new Error('Empty indices list')
  }

  if (!indices.every(Number.isFinite)) {
    throw new Error('Non-numeric index values')
  }

  indices.forEach(value => {
    if (!players[value]) {
      throw new Error(`Non-existent player index: ${value}`)
    }
  })
}
