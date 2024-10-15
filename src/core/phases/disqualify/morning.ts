import { MorningState, DayState } from '../types'

export const morningDisqualify = (
  state: MorningState,
  indices: number[],
): MorningState | DayState => {
  console.log(indices)

  return state
}
