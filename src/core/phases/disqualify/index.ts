import {
  validateIndices,
  getAliveRoles,
  getGameRoles,
  GamePlayer,
} from '@core/elementary'
import { checkVictory } from '@core/features'

import { createEndState } from '../factory/end'
import { eveningDisqualify } from './evening'
import { morningDisqualify } from './morning'
import { dayDisqualify } from './day'
import { GameState } from '../types'

export const disqualify = (state: GameState, indices: number[]): GameState => {
  if (state.phase === 'start' || state.phase === 'end') {
    throw new Error('Cannot disqualify this phase')
  }

  validateIndices(state.players, indices)

  const players = state.players.map<GamePlayer>((player, index) => ({
    alive: indices.includes(index) ? false : player.alive,
    role: player.role,
  }))

  const nextState = structuredClone(state)
  const winner = checkVictory(getAliveRoles(players))

  nextState.players = players

  return winner
    ? createEndState(getGameRoles(players), winner)
    : nextState.phase === 'day'
      ? dayDisqualify(nextState)
      : nextState.phase === 'evening'
        ? eveningDisqualify(nextState, indices)
        : nextState.phase === 'morning'
          ? morningDisqualify(nextState, indices)
          : nextState
}
