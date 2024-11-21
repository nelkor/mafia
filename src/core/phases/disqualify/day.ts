import { createNightState } from '../factory/night'
import { createDayState } from '../factory/day'
import { NightState, DayState } from '../types'

export const dayDisqualify = (state: DayState): NightState | DayState => {
  if (state.speeches.length === 1 && !state.players[state.speeches[0]].alive) {
    // Если игрок должен умереть от отравления, ему даётся последнее слово.

    return createNightState(state)
  }

  const speeches = state.speeches.filter(
    speaker => state.players[speaker].alive,
  )

  return createDayState(state, speeches, state.nominations, true)
}
