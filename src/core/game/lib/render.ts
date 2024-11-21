import { GameState } from '@core/phases'

export const render = (state: GameState) => structuredClone(state)
