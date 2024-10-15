import { EveningState, NightState, DayState } from '../types'
import { createEveningState } from '../factory/evening'
import { createNightState } from '../factory/night'
import { createDayState } from '../factory/day'

export const changeDayState = (
  state: DayState,
): EveningState | NightState | DayState =>
  state.speeches.length > 1
    ? createDayState(state, state.speeches.slice(1), state.nominations)
    : state.wasDisqualification
      ? createNightState(state)
      : createEveningState(state)
