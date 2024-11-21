import { MorningState, StateGlobal } from '../types'

export const createMorningState = (state: StateGlobal): MorningState => ({
  ...structuredClone(state),
  opener: state.opener + 1,
  phase: 'morning',
})
