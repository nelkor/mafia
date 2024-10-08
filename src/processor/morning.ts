import {
  checkVictoryCondition,
  createDaySpeeches,
  getAliveRoles,
  copyPlayers,
} from '../utils'
import { MorningState, GameState } from '../types'

export const processMorning = (state: MorningState): GameState | null => {
  if (state.stage === 'end') {
    return null
  }

  const players = copyPlayers(state.players)

  // Идёт прощальная речь и есть ещё речи в очереди
  if (state.stage === 'speech' && state.speeches.length > 1) {
    return {
      speeches: state.speeches.slice(1),
      opener: state.opener,
      time: 'morning',
      stage: 'speech',
      winner: null,
      victims: [],
      players,
    }
  }

  // Идёт информирование игроков и есть жертвы
  if (state.stage === 'info' && state.victims.length) {
    const winner = checkVictoryCondition(getAliveRoles(players))

    if (winner) {
      return {
        time: 'morning',
        stage: 'end',
        speeches: [],
        victims: [],
        opener: 0,
        players,
        winner,
      }
    }

    return {
      speeches: state.victims,
      opener: state.opener,
      time: 'morning',
      stage: 'speech',
      winner: null,
      victims: [],
      players,
    }
  }

  // Иначе наступает день
  const speeches = createDaySpeeches(players, state.opener)

  return {
    opener: speeches[0],
    nominees: {},
    time: 'day',
    speeches,
    players,
  }
}
