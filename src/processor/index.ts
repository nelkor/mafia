import { processMorning } from './morning'
import { processEvening } from './evening'
import { processNight } from './night'
import { GameState } from '../types'
import { processDay } from './day'

export const processState = (state: GameState): GameState | null =>
  state.time === 'morning'
    ? processMorning(state)
    : state.time === 'evening'
      ? processEvening(state)
      : state.time === 'night'
        ? processNight(state)
        : processDay(state)
