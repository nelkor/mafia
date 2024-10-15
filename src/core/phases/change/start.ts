import { createPlayer } from '@core/elementary'

import { createEmptyMemorizedTargets } from '../lib/memorized-targets'
import { StartState, DayState } from '../types'
import { createDayState } from '../factory/day'

export const changeStartState = (state: StartState): DayState =>
  createDayState(
    {
      previousTargets: createEmptyMemorizedTargets(),
      players: state.roles.map(createPlayer),
      opener: 0,
    },
    Array.from(state.roles.keys()),
    [],
  )
