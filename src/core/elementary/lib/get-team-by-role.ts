import { GameRole, GameTeam } from '../enums'

const singletons: GameRole[] = ['poisoner', 'maniac', 'heir']
const mafia: GameRole[] = ['masker', 'mafia', 'don']

export const getTeamByRole = (role: GameRole): GameTeam =>
  singletons.includes(role)
    ? 'singleton'
    : mafia.includes(role)
      ? 'mafia'
      : 'town'
