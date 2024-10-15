import { changeEveningState } from './change/evening'
import { changeMorningState } from './change/morning'
import { changeStartState } from './change/start'
import { changeNightState } from './change/night'
import { changeDayState } from './change/day'
import { GameState } from './types'

export const changeState = (state: GameState): GameState | null =>
  state.phase === 'start'
    ? changeStartState(state)
    : state.phase === 'morning'
      ? changeMorningState(state)
      : state.phase === 'day'
        ? changeDayState(state)
        : state.phase === 'evening'
          ? changeEveningState(state)
          : state.phase === 'night'
            ? changeNightState(state)
            : null
