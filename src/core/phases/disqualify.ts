import { getAliveRoles, getGameRoles, GamePlayer } from '@core/elementary'
import { checkVictory } from '@core/features'

import { validateIndices } from './lib/validate-indices'
import { createEndState } from './factory/end'
import { GameState } from './types'

// Переделать, разделить по игровым фазам.
export const disqualify = (state: GameState, indices: number[]): GameState => {
  validateIndices(state, indices)

  if (state.phase === 'start' || state.phase === 'end') {
    throw new Error('Cannot disqualify this phase')
  }

  if (indices.some(index => !state.players[index].alive)) {
    throw new Error('Only alive player can be disqualified')
  }

  const players = state.players.map<GamePlayer>((player, index) => ({
    alive: indices.includes(index) ? false : player.alive,
    role: player.role,
  }))

  const nextState = structuredClone(state)
  const winner = checkVictory(getAliveRoles(players))

  nextState.players = players

  if (nextState.phase === 'day') {
    nextState.wasDisqualification = true

    // Если дисквалифицирован игрок, произносящий последнюю речь за день,
    // при этом игра не закончена, наступает ночь.
    nextState.speeches = nextState.speeches.reduce((acc, cur) => {
      if (!indices.includes(cur)) {
        acc.push(cur)
      }

      return acc
    }, [])
  }

  return winner ? createEndState(getGameRoles(players), winner) : nextState
}
