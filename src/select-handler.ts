import {
  resolveNightVictims,
  getMaximumVotes,
  getAliveRoles,
  collectVotes,
  createActors,
  copyPlayers,
} from './utils'
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

  if (state.time === 'night') {
    const [selected] = indices
    const [actor] = state.actors
    const selectedRole = players[selected].role
    const targets = structuredClone(state.targets)

    // Необходимо проверить, что актор не исключён из игры.
    // Необходимо проверить, что доктор не лечит подряд.

    if (targets[actor] !== null) {
      throw new Error(`Actor ${actor} has already acted this night`)
    }

    if (indices.length > 1) {
      throw new Error(`Only one player can be selected by ${actor}`)
    }

    targets[actor] = selected

    // Ищущие роли выбором обновляют found.
    if (actor === 'sheriff' || actor === 'don') {
      return {
        found:
          ((selectedRole === 'mafia' || selectedRole === 'don') &&
            actor === 'sheriff') ||
          (actor === 'don' && selectedRole === 'sheriff'),
        actors: [...state.actors],
        opener: state.opener,
        time: 'night',
        targets,
        players,
      }
    }

    // В очереди больше одного действующего.
    if (state.actors.length > 1) {
      return {
        actors: state.actors.slice(1),
        opener: state.opener,
        time: 'night',
        found: null,
        players,
        targets,
      }
    }

    // Иначе наступает утро.
    const victims = resolveNightVictims(targets)

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
      if (new Set(indices).size !== indices.length) {
        throw new Error('Voters must not be duplicated')
      }

      indices.forEach(index => {
        if (!players[index]?.alive) {
          throw new Error(`Player with index ${index} cannot vote`)
        }
      })

      // Большинство ЗА.
      if (indices.length > getAliveRoles(players).length / 2) {
        state.nominees.forEach(index => {
          players[index].alive = false
        })

        return {
          kicked: state.nominees,
          opener: state.opener,
          time: 'evening',
          repeat: false,
          stage: 'info',
          winner: null,
          speeches: [],
          nominees: [],
          vote: {},
          players,
        }
      }

      // Иначе наступает ночь.
      return {
        targets: {
          sheriff: null,
          maniac: null,
          doctor: null,
          mafia: null,
          don: null,
        },
        actors: createActors(players),
        opener: state.opener,
        time: 'night',
        found: null,
        players,
      }
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
