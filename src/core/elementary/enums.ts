export type GameTeam = 'singleton' | 'mafia' | 'town'

export type NightActor =
  | 'bodyguard'
  | 'poisoner'
  | 'ricochet'
  | 'swindler'
  | 'sheriff'
  | 'maniac'
  | 'doctor'
  | 'masker'
  | 'mafia'
  | 'heir'
  | 'don'

export type GameRole = NightActor | 'citizen'

export type GamePhase = 'morning' | 'evening' | 'night' | 'day'
