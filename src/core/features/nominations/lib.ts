import { GamePlayer } from '@core/elementary'

import { DayNominations } from './types'

export const nominate = (
  nominations: DayNominations,
  players: GamePlayer[],
  indices: number[],
  speaker: number,
): DayNominations => {
  if (indices.length > 1) {
    throw new Error('Only one player can be nominated')
  }

  const [nominee] = indices

  if (!players[nominee].alive) {
    throw new Error('Only alive players can be nominated')
  }

  const speakers = nominations.map(pair => pair[0])
  const nominees = nominations.map(pair => pair[1])

  if (speakers.includes(speaker)) {
    throw new Error('Already nominated a player')
  }

  if (nominees.includes(nominee)) {
    throw new Error('Cannot nominate someone who has been nominated')
  }

  return [...structuredClone(nominations), [speaker, nominee]]
}
