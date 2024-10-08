import {
  checkVictoryCondition,
  getMaximumVotes,
  getAliveRoles,
  collectVotes,
  createActors,
  copyPlayers,
} from '../utils'
import { EveningState, GameState } from '../types'

export const processEvening = (state: EveningState): GameState | null => {
  if (state.stage === 'end') {
    return null
  }

  const players = copyPlayers(state.players)

  if (state.stage === 'info') {
    if (state.kicked.length) {
      const winner = checkVictoryCondition(getAliveRoles(players))

      // Есть победитель.
      if (winner) {
        return {
          time: 'evening',
          repeat: false,
          stage: 'end',
          speeches: [],
          nominees: [],
          kicked: [],
          opener: 0,
          vote: {},
          players,
          winner,
        }
      }

      // Если победителя нет, изгнанные получают прощальную речь.
      return {
        speeches: [...state.kicked],
        opener: state.opener,
        time: 'evening',
        stage: 'speech',
        repeat: false,
        nominees: [],
        winner: null,
        kicked: [],
        vote: {},
        players,
      }
    }

    // Нет номинантов — наступает ночь.
    if (!state.nominees.length) {
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

    // Есть один номинант — он изгоняется без явного голосования.
    if (state.nominees.length === 1) {
      players[state.nominees[0]].alive = false

      return {
        kicked: state.nominees,
        opener: state.opener,
        time: 'evening',
        stage: 'info',
        repeat: false,
        nominees: [],
        speeches: [],
        winner: null,
        vote: {},
        players,
      }
    }

    const isEveryoneEqual =
      new Set(Object.values(state.vote).map(({ length }) => length)).size === 1

    // На повторном голосовании все выставленные игроки
    // набрали одинаковое количество голосов.
    if (state.repeat && isEveryoneEqual) {
      // Если выставлены все живые игроки — наступает ночь.
      if (state.nominees.length === getAliveRoles(players).length) {
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

      // Иначе поднимается вопрос об исключении всех выставленных игроков.
      return {
        nominees: state.nominees,
        stage: 'vote-for-all',
        opener: state.opener,
        time: 'evening',
        repeat: false,
        speeches: [],
        winner: null,
        kicked: [],
        vote: {},
        players,
      }
    }

    // Несколько номинантов получают оправдательную речь в порядке выставления.
    return {
      speeches: state.nominees,
      nominees: state.nominees,
      repeat: state.repeat,
      opener: state.opener,
      stage: 'speech',
      time: 'evening',
      winner: null,
      kicked: [],
      vote: {},
      players,
    }
  }

  if (state.stage === 'speech') {
    // В очереди более одной речи — переходим к следующей.
    if (state.speeches.length > 1) {
      return {
        speeches: state.speeches.slice(1),
        nominees: state.nominees,
        repeat: state.repeat,
        opener: state.opener,
        time: 'evening',
        stage: 'speech',
        winner: null,
        kicked: [],
        vote: {},
        players,
      }
    }

    // Есть номинанты — переходим к голосованию.
    if (state.nominees.length) {
      return {
        nominees: state.nominees,
        repeat: state.repeat,
        opener: state.opener,
        time: 'evening',
        stage: 'vote',
        winner: null,
        speeches: [],
        kicked: [],
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
    const { finished, vote } = collectVotes(state, [])

    if (finished) {
      const voteResult = getMaximumVotes(vote)
      const nominees = voteResult.length > 1 ? voteResult : []
      const kicked = voteResult.length === 1 ? voteResult : []

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

  if (state.stage === 'vote-for-all') {
    // Ноль голосов за исключение кандидатов — наступает ночь.
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

  return null
}
