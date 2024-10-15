import {
  createStartState,
  selectPlayers,
  changeState,
  disqualify,
  GameState,
} from '@core/phases'
import { GameRole } from '@core/elementary'

import { validateRoles } from './validate-roles'
import { render } from './render'

export const createGame = (roles: GameRole[]) => {
  const error = validateRoles(roles)
  const states: GameState[] = []

  if (error) {
    throw new Error(error)
  }

  return {
    go() {
      const lastState = states.at(-1)

      const nextState = lastState
        ? changeState(lastState)
        : createStartState(roles)

      if (nextState) {
        states.push(nextState)

        return render(nextState)
      }

      if (!lastState) {
        throw new Error('No state to return from go')
      }

      return render(lastState)
    },
    selectPlayers(...players: number[]) {
      const lastState = states.at(-1)

      if (!lastState) {
        throw new Error('Cannot select players before start')
      }

      const nextState = selectPlayers(lastState, players)

      states.push(nextState)

      return render(nextState)
    },
    disqualify(...players: number[]) {
      const lastState = states.at(-1)

      if (!lastState) {
        throw new Error('Cannot disqualify before start')
      }

      const nextState = disqualify(lastState, players)

      states.push(nextState)

      return render(nextState)
    },
    back() {
      if (states.length > 1) {
        states.pop()
      }

      return render(states.at(-1) as GameState)
    },
  }
}
