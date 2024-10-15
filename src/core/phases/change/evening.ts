import { createNightState } from '../factory/night'
import { EveningState, NightState } from '../types'

export const changeEveningState = (
  state: EveningState,
): EveningState | NightState => createNightState(state)
