import {
  EveningState,
  NightTargets,
  GamePlayer,
  NightActor,
  GameState,
  GameTeam,
  GameRole,
} from './types'

const getTeamByRole = (role: GameRole): GameTeam =>
  // У роли "Маньяк" команда "Маньяк".
  role === 'maniac'
    ? 'maniac'
    : // У ролей "Мафиози" и "Дон" команда "Мафия".
      role === 'don' || role === 'mafia'
      ? 'mafia'
      : // Все остальные поддерживаемые роли относятся к мирному городу.
        'town'

export const checkVictoryCondition = (roles: GameRole[]): GameTeam | null => {
  const teamRepresentatives = roles
    .map(getTeamByRole)
    .reduce<Record<GameTeam, number>>(
      (acc, team) => {
        acc[team]++

        return acc
      },
      {
        maniac: 0,
        mafia: 0,
        town: 0,
      },
    )

  // Если в игре присутствует маньяк.
  return teamRepresentatives.maniac
    ? // Если всего в игре не более двух игроков — победа маньяка.
      roles.length <= 2
      ? 'maniac'
      : // Если представителей мафии в игре больше,
        // чем остальных игроков — победа команды мафии.
        teamRepresentatives.mafia > roles.length / 2
        ? 'mafia'
        : // Иначе — игра продолжается.
          null
    : // Если маньяка нет, но в игре есть живая мафия.
      teamRepresentatives.mafia
      ? // Если представителей мафии в игре меньше,
        // чем остальных игроков — игра продолжается.
        teamRepresentatives.mafia < roles.length / 2
        ? null
        : // Иначе — победа команды мафии.
          'mafia'
      : // Иначе — победа мирного города.
        'town'
}

export const copyPlayers = (players: GamePlayer[]): GamePlayer[] =>
  players.map(player => ({ ...player }))

export const createPlayer = (role: GameRole): GamePlayer => ({
  alive: true,
  role,
})

export const getAliveRoles = (players: GamePlayer[]) =>
  players.filter(player => player.alive).map(player => player.role)

export const createDaySpeeches = (players: GamePlayer[], turn: number) => {
  const aliveIndices = players.reduce<number[]>((acc, { alive }, index) => {
    if (alive) {
      acc.push(index)
    }

    return acc
  }, [])

  const firstSpeakerIndex = Math.max(
    aliveIndices.findIndex(index => index >= turn),
    0,
  )

  return [
    ...aliveIndices.slice(firstSpeakerIndex),
    ...aliveIndices.slice(0, firstSpeakerIndex),
  ]
}

export const createFirstState = (roles: GameRole[]): GameState => ({
  players: roles.map(createPlayer),
  time: 'morning',
  stage: 'info',
  speeches: [],
  winner: null,
  victims: [],
  opener: 0,
})

export const collectVotes = (
  state: EveningState,
  indices: number[],
): {
  vote: Record<number, number[]>
  finished: boolean
} => {
  if (new Set(indices).size !== indices.length) {
    throw new Error('Voters must not be duplicated')
  }

  const previouslyVoted = Object.values(state.vote).flat()

  const allAliveIndices = state.players.reduce<number[]>(
    (acc, { alive }, index) => {
      if (alive) {
        acc.push(index)
      }

      return acc
    },
    [],
  )

  indices.forEach(index => {
    if (previouslyVoted.includes(index)) {
      throw new Error(`Player with index ${index} has already voted before`)
    }
  })

  const vote = { ...structuredClone(state.vote), [state.nominees[0]]: indices }

  const restIndices = allAliveIndices.reduce<number[]>((acc, cur) => {
    if (!previouslyVoted.includes(cur) && !indices.includes(cur)) {
      acc.push(cur)
    }

    return acc
  }, [])

  let finished = false

  if (state.nominees.length === 2) {
    vote[state.nominees[1]] = restIndices

    finished = true
  } else if (!restIndices.length) {
    state.nominees.slice(1).forEach(nominee => {
      vote[nominee] = []
    })

    finished = true
  }

  return { finished, vote }
}

export const getMaximumVotes = (vote: Record<number, number[]>): number[] => {
  const result = Object.entries(vote).map(([key, voters]) => ({
    score: voters.length,
    key,
  }))

  const maxScore = Math.max(...result.map(({ score }) => score))

  return result
    .filter(({ score }) => score === maxScore)
    .map(({ key }) => parseInt(key))
}

export const createActors = (players: GamePlayer[]): NightActor[] => {
  const roles = players.map(({ role }) => role)
  const actors: NightActor[] = []

  if (roles.includes('mafia') || roles.includes('don')) {
    actors.push('mafia')
  }

  if (roles.includes('maniac')) {
    actors.push('maniac')
  }

  if (roles.includes('don')) {
    actors.push('don')
  }

  if (roles.includes('sheriff')) {
    actors.push('sheriff')
  }

  if (roles.includes('doctor')) {
    actors.push('doctor')
  }

  return actors
}

export const resolveNightVictims = (targets: NightTargets): number[] => {
  const victims = []

  if (targets.mafia !== null && targets.mafia !== targets.doctor) {
    victims.push(targets.mafia)
  }

  if (targets.maniac !== null && targets.maniac !== targets.doctor) {
    victims.push(targets.maniac)
  }

  return victims
}
