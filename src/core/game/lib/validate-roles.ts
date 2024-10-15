import { checkVictory } from '@core/features'
import { GameRole } from '@core/elementary'

const allRoles: GameRole[] = [
  'bodyguard',
  'poisoner',
  'ricochet',
  'swindler',
  'citizen',
  'sheriff',
  'maniac',
  'doctor',
  'masker',
  'mafia',
  'heir',
  'don',
]

export const validateRoles = (roles: GameRole[]) => {
  if (!roles || !roles.length) {
    return 'Cannot create a game without players'
  }

  const firstUnknownRole = roles.find(role => !allRoles.includes(role))

  if (firstUnknownRole) {
    return `Unknown role: ${firstUnknownRole}`
  }

  const {
    bodyguard,
    poisoner,
    ricochet,
    swindler,
    sheriff,
    maniac,
    doctor,
    masker,
    mafia,
    heir,
    don,
  } = roles.reduce<Record<GameRole, number>>(
    (acc, role) => {
      acc[role]++

      return acc
    },
    {
      bodyguard: 0,
      poisoner: 0,
      ricochet: 0,
      swindler: 0,
      citizen: 0,
      sheriff: 0,
      maniac: 0,
      doctor: 0,
      masker: 0,
      mafia: 0,
      heir: 0,
      don: 0,
    },
  )

  const singleton = poisoner + maniac + heir
  const mafiaTeam = don + mafia + masker
  const shooters = mafiaTeam + maniac

  const counterWithoutShooters = shooters
    ? ''
    : bodyguard
      ? 'bodyguard'
      : ricochet
        ? 'ricochet'
        : ''

  const counterWithoutSheriff = sheriff
    ? ''
    : masker
      ? 'masker'
      : don
        ? 'don'
        : ''

  if (counterWithoutShooters) {
    return `Forbidden to have a ${counterWithoutShooters} without any shooters`
  }

  if (counterWithoutSheriff) {
    return `Forbidden to have a ${counterWithoutSheriff} without a sheriff`
  }

  if (sheriff && !mafiaTeam) {
    return 'Forbidden to have a sheriff without the mafia team'
  }

  if (singleton > 1) {
    return 'Forbidden to have more than one singleton'
  }

  const duplicate =
    bodyguard > 1
      ? 'bodyguard'
      : ricochet > 1
        ? 'ricochet'
        : swindler > 1
          ? 'swindler'
          : sheriff > 1
            ? 'sheriff'
            : doctor > 1
              ? 'doctor'
              : masker > 1
                ? 'masker'
                : don > 1
                  ? 'don'
                  : ''

  if (duplicate) {
    return `Too many representatives: ${duplicate}`
  }

  const winner = checkVictory(roles)

  return winner ? `Instant victory of ${winner}` : ''
}
