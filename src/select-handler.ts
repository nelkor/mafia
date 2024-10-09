import { copyPlayers } from './utils'
import { GameState } from './types'

export const handleSelect = (
  state: GameState,
  indices: number[],
): GameState => {
  // Никто не был выбран.
  if (!indices.length) {
    throw new Error('Cannot select zero players')
  }

  // Утром нет оснований для выбора игроков.
  if (state.time === 'morning') {
    throw new Error('No reason to select players in the morning')
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

  // Функция зашла в тупик.
  throw new Error('handleSelect dead end')
}
