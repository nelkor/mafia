import { GamePlayer, GameTeam, GameRole } from './types'

const allRoles: GameRole[] = [
  'sheriff',
  'citizen',
  'maniac',
  'doctor',
  'mafia',
  'don',
]

const rolesWeights: Record<GameRole, number> = {
  sheriff: 1,
  citizen: 0,
  doctor: 2,
  maniac: 5,
  mafia: 3,
  don: 4,
}

const validateRole = (role: GameRole) => allRoles.includes(role)

const getTeamByRole = (role: GameRole): GameTeam =>
  // У роли "Маньяк" команда "Маньяк".
  role === 'maniac'
    ? 'maniac'
    : // У ролей "Мафиози" и "Дон" команда "Мафия".
      role === 'don' || role === 'mafia'
      ? 'mafia'
      : // Все остальные поддерживаемые роли относятся к мирному городу.
        'town'

const checkVictoryCondition = (roles: GameRole[]): GameTeam | null => {
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

export const sortRoles = (roles: GameRole[]) =>
  roles
    .filter(role => role !== 'citizen')
    .toSorted((role1, role2) => rolesWeights[role2] - rolesWeights[role1])

export const revealRoles = (roles: GameRole[]) =>
  Object.fromEntries(
    roles
      .reduce((map, role, index) => {
        if (role === 'citizen') {
          return map
        }

        const value = map.get(role)

        if (value) {
          const list = Array.isArray(value) ? value : [value]

          list.push(index)
          list.sort()

          map.set(role, list)
        } else {
          map.set(role, index)
        }

        return map
      }, new Map<GameRole, number[] | number>())
      .entries(),
  )

export const createPlayer = (role: GameRole): GamePlayer => ({
  alive: true,
  role,
})

export const validateStartRoles = (roles: GameRole[]) => {
  // Если переданы неизвестные роли — это неправильно.
  if (!roles || !roles.every(validateRole)) {
    return false
  }

  const { sheriff, maniac, doctor, don } = roles.reduce<
    Record<GameRole, number>
  >(
    (acc, role) => {
      acc[role]++

      return acc
    },
    {
      sheriff: 0,
      citizen: 0,
      maniac: 0,
      doctor: 0,
      mafia: 0,
      don: 0,
    },
  )

  // Если у какой-либо из отдельно действующих ролей
  // больше одного представителя — это неправильно.
  // Если есть дон, но нет шерифа — это неправильно.
  if (sheriff > 1 || maniac > 1 || doctor > 1 || don > 1 || (don && !sheriff)) {
    return false
  }

  // Если игра не может продолжаться с текущими ролями — это неправильно.
  return !checkVictoryCondition(roles)
}
