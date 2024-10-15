import { DayNominations } from '@core/features'

import { StateGlobal, DayState } from '../types'

export const createDayState = (
  state: StateGlobal,
  speeches: number[],
  nominations: DayNominations,
): DayState => ({
  ...structuredClone(state),
  nominations: structuredClone(nominations),
  wasDisqualification: false,
  speeches: [...speeches],
  phase: 'day',
})
