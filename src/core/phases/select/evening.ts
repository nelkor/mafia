import { createEveningState } from '../factory/evening'
import { EveningState } from '../types'

export const eveningSelect = (
  state: EveningState,
  indices: number[],
): EveningState => {
  console.log(indices)

  return createEveningState(state)
}
