import { createStartPhase, changeState, GameState } from '../../phases'
import { validateRoles } from './validate-roles'
import { GameRole } from '../../elementary'
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
        : createStartPhase(roles)

      if (nextState) {
        states.push(nextState)

        return render(nextState)
      }

      if (!lastState) {
        throw new Error('No state to return from go')
      }

      return render(lastState)
    },
  }
}
