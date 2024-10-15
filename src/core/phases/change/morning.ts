import { MorningState, DayState } from '../types'
import { createDayState } from '../factory/day'

export const changeMorningState = (
  state: MorningState,
): MorningState | DayState => createDayState(state, [], [])
