import { getTeamByRole, GameRole, GameTeam } from '@core/elementary'

export const checkVictory = (roles: GameRole[]): GameTeam | null => {
  const teamRepresentatives = roles
    .map(getTeamByRole)
    .reduce<Record<GameTeam, number>>(
      (acc, team) => {
        acc[team]++

        return acc
      },
      {
        singleton: 0,
        mafia: 0,
        town: 0,
      },
    )

  // Если в игре присутствует одиночка.
  return teamRepresentatives.singleton
    ? // Если всего в игре не более двух игроков — победа одиночки.
      roles.length <= 2
      ? 'singleton'
      : // Если представителей мафии в игре больше,
        // чем остальных игроков — победа команды мафии.
        teamRepresentatives.mafia > roles.length / 2
        ? 'mafia'
        : // Иначе — игра продолжается.
          null
    : // Если одиночки нет, но в игре есть живая мафия.
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
