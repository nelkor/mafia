import { EveningState, GameState } from '../types'

export const processEvening = (state: EveningState): GameState => {
  console.log('good evening')

  return state
}
