import { MorningState, DayState, EndState } from '../types'
import { createDayState } from '../factory/day'

export const changeMorningState = (
  state: MorningState,
): MorningState | DayState | EndState => createDayState(state, [], [])
