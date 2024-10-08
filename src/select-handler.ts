import { getMaximumVotes, collectVotes, copyPlayers } from './utils'
import { GameState } from './types'

export const handleSelect = (
  state: GameState,
  indices: number[],
): GameState => {
  // Никто не был выбран.
  if (!indices.length) {
    throw new Error('Cannot select zero players')
  }

  const players = copyPlayers(state.players)

  if (state.time === 'day') {
    if (indices.length > 1) {
      throw new Error('Only one player can be nominated')
    }

    const [nominee] = indices
    const [speaker] = state.speeches

    if (isFinite(state.nominees[speaker])) {
      throw new Error('Already nominated a player')
    }

    if (!state.players[nominee]) {
      throw new Error('There is no player with this index')
    }

    if (!state.players[nominee].alive) {
      throw new Error('Cannot nominate an ejected player')
    }

    if (Object.values(state.nominees).includes(nominee)) {
      throw new Error('Cannot nominate someone who has been nominated')
    }

    return {
      nominees: { ...state.nominees, [speaker]: indices[0] },
      speeches: [...state.speeches],
      opener: state.opener,
      time: 'day',
      players,
    }
  }

  if (state.time === 'evening') {
    if (state.stage === 'vote-for-all') {
      // Большинство ЗА — переходим к "info".
      //
      // Иначе наступает ночь.

      return state
    }

    if (state.stage === 'vote') {
      const { finished, vote } = collectVotes(state, indices)

      // Дубликат кода из evening.ts
      if (!finished) {
        return {
          nominees: state.nominees.slice(1),
          opener: state.opener,
          repeat: state.repeat,
          time: 'evening',
          stage: 'vote',
          winner: null,
          speeches: [],
          kicked: [],
          players,
          vote,
        }
      }

      const voteResult = getMaximumVotes(vote)
      const kicked = voteResult.length === 1 ? voteResult : []
      const nominees = voteResult.length > 1 ? voteResult : []

      if (voteResult.length === 1) {
        players[voteResult[0]].alive = false
      }

      return {
        repeat: voteResult.length > 1,
        opener: state.opener,
        time: 'evening',
        stage: 'info',
        winner: null,
        speeches: [],
        nominees,
        players,
        kicked,
        vote,
      }
    }
  }

  // Нет причины для выбора игроков.
  throw new Error('No reason to select players')
}
