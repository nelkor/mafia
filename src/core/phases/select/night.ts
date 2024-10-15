import { createNightState } from '../factory/night'
import { NightState } from '../types'

export const nightSelect = (
  state: NightState,
  indices: number[],
): NightState => {
  console.log(indices)

  return createNightState(state)
}
