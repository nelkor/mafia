import { resolveNightVictims, copyPlayers } from '../utils'
import { NightState, GameState } from '../types'

export const processNight = (state: NightState): GameState => {
  const players = copyPlayers(state.players)

  // В очереди больше одного действующего.
  if (state.actors.length > 1) {
    return {
      targets: structuredClone(state.targets),
      actors: state.actors.slice(1),
      opener: state.opener,
      time: 'night',
      found: null,
      players,
    }
  }

  // Иначе наступает утро.
  const victims = resolveNightVictims(state.targets)

  victims.forEach(index => {
    players[index].alive = false
  })

  return {
    opener: state.opener + 1,
    time: 'morning',
    stage: 'info',
    winner: null,
    speeches: [],
    victims,
    players,
  }
}
