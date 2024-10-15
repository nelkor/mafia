import { EveningState, StateGlobal } from '../types'

export const createEveningState = (state: StateGlobal): EveningState => ({
  ...structuredClone(state),
  phase: 'evening',
})
