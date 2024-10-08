import { validateStartRoles } from './validation'
import { handleSelect } from './select-handler'
import { GameState, GameRole } from './types'
import { createFirstState } from './utils'
import { processState } from './processor'

export const createGame = (roles: GameRole[]) => {
  validateStartRoles(roles)

  const states: GameState[] = []

  return {
    selectPlayers(...players: number[]) {
      const currentState = states.at(-1)

      if (!currentState) {
        throw new Error('Impossible to select players before start')
      }

      const nextState = handleSelect(currentState, players)

      states.push(nextState)

      return nextState
    },
    go() {
      const currentState = states.at(-1)

      const nextState = currentState
        ? processState(currentState)
        : createFirstState(roles)

      if (nextState) {
        states.push(nextState)

        return nextState
      }

      return states.at(-1)
    },
    back() {
      if (states.length > 1) {
        states.pop()
      }

      return states.at(-1)
    },
    disqualify(...players: number[]) {
      console.log('disqualify', players.join(', '))
    },
  }
}
