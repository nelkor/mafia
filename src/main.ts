import { createGame as createGameOld } from './create-game'
import { createGame } from './core'

Object.defineProperty(window, 'createGame', { value: createGame })
Object.defineProperty(window, 'createGameOld', { value: createGameOld })
