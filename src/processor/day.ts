import { GameState, DayState } from '../types'
import { copyPlayers } from '../utils'

export const processDay = (state: DayState): GameState => {
  const players = copyPlayers(state.players)

  // В очереди ещё есть речи.
  if (state.speeches.length > 1) {
    return {
      speeches: state.speeches.slice(1),
      nominees: { ...state.nominees },
      opener: state.opener,
      time: 'day',
      players,
    }
  }

  // Иначе наступает вечер.
  return {
    nominees: Object.values(state.nominees),
    opener: state.opener,
    time: 'evening',
    repeat: false,
    stage: 'info',
    winner: null,
    speeches: [],
    kicked: [],
    vote: {},
    players,
  }
}
