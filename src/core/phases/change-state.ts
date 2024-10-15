import { GameState } from './types'

export const changeState = (state: GameState): GameState | null => {
  console.log(state.phase)

  return null
}
