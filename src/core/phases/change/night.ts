import { createMorningState } from '../factory/morning'
import { MorningState, NightState } from '../types'

export const changeNightState = (
  state: NightState,
): MorningState | NightState => createMorningState(state)
