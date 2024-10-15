import { nominate } from '@core/features'

import { createDayState } from '../factory/day'
import { DayState } from '../types'

export const daySelect = (state: DayState, indices: number[]): DayState =>
  createDayState(
    state,
    state.speeches,
    nominate(state.nominations, state.players, indices, state.speeches[0]),
  )
