import { StateGlobal, NightState } from '../types'

export const createNightState = (state: StateGlobal): NightState => ({
  ...structuredClone(state),
  phase: 'night',
})
