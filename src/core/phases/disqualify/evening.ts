import { EveningState, NightState } from '../types'

export const eveningDisqualify = (
  state: EveningState,
  indices: number[],
): EveningState | NightState => {
  console.log(indices)

  return state
}
