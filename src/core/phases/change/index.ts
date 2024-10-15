import { changeEveningState } from './evening'
import { changeMorningState } from './morning'
import { changeStartState } from './start'
import { changeNightState } from './night'
import { changeDayState } from './day'
import { GameState } from '../types'

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
