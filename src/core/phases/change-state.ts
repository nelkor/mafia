import { GameState } from './types'

export const changeState = (state: GameState): GameState | null => {
  switch (state.phase) {
    case 'end':
      return null
    case 'day':
      return null
    case 'night':
      return null
    case 'start':
      return null
    case 'evening':
      return null
    case 'morning':
      return null
  }

  throw new Error(`Unexpected game phase: ${JSON.stringify(state)}`)
}
