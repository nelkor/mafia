import { createPlayer } from '@core/elementary'

import { StartState, DayState } from '../types'
import { createDayState } from '../factory/day'

export const changeStartState = (state: StartState): DayState =>
  createDayState(
    {
      players: state.roles.map(createPlayer),
      previousTargets: {},
      opener: 0,
    },
    Array.from(state.roles.keys()),
    [],
  )
