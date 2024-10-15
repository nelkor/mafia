import { createEveningState } from '../factory/evening'
import { EveningState, DayState } from '../types'
import { createDayState } from '../factory/day'

export const changeDayState = (state: DayState): EveningState | DayState =>
  state.speeches.length > 1
    ? createDayState(state, state.speeches.slice(1), state.nominations)
    : createEveningState(state)
