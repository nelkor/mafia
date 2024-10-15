import { EveningState, StateGlobal } from '../types'

export const createEveningState = (state: StateGlobal): EveningState => ({
  players: structuredClone(state.players),
  previousTargets: state.previousTargets,
  opener: state.opener,
  phase: 'evening',
})
