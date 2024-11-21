import { DayNominations } from '@core/features'

import { StateGlobal, DayState } from '../types'

export const createDayState = (
  state: StateGlobal,
  speeches: number[],
  nominations: DayNominations,
  wasDisqualification = false,
): DayState => ({
  previousTargets: structuredClone(state.previousTargets),
  nominations: structuredClone(nominations),
  players: structuredClone(state.players),
  speeches: [...speeches],
  opener: state.opener,
  wasDisqualification,
  phase: 'day',
})
