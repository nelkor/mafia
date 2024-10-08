import { checkVictoryCondition } from './utils'
import { GameRole } from './types'

const allRoles: GameRole[] = [
  'sheriff',
  'citizen',
  'maniac',
  'doctor',
  'mafia',
  'don',
]

export const validateStartRoles = (roles: GameRole[]) => {
  if (!roles || !roles.length) {
    throw new Error('Cannot create a game without players')
  }

  const firstUnknownRole = roles.find(role => !allRoles.includes(role))

  if (firstUnknownRole) {
    throw new Error(`Unknown role: ${firstUnknownRole}`)
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

  if (sheriff > 1) {
    throw new Error('Too many representatives: sheriff')
  }

  if (maniac > 1) {
    throw new Error('Too many representatives: maniac')
  }

  if (doctor > 1) {
    throw new Error('Too many representatives: doctor')
  }

  if (don > 1) {
    throw new Error('Too many representatives: don')
  }

  if (don && !sheriff) {
    throw new Error('Forbidden to use a don without a sheriff')
  }

  const winner = checkVictoryCondition(roles)

  if (winner) {
    throw new Error(`Instant victory of ${winner}`)
  }
}
