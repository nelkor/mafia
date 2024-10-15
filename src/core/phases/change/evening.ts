import { EveningState, NightState, EndState } from '../types'
import { createNightState } from '../factory/night'

export const changeEveningState = (
  state: EveningState,
): EveningState | NightState | EndState => createNightState(state)
