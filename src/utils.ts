import { GamePlayer, GameState, GameTeam, GameRole } from './types'

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
