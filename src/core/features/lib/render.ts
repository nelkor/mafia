import { GameState } from '../../phases'

export const render = (state: GameState) => structuredClone(state)
