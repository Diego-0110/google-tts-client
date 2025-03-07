export const VOICE_TYPES = [
  { value: 'Standard' },
  { value: 'Wavenet', name: 'WaveNet' },
  { value: 'Neural2' },
  { value: 'Studio' },
  { value: 'Chirp' },
  { value: 'All' }
]

export const VOICE_GENDERS = [
  { value: 'MALE', name: 'Male' },
  { value: 'FEMALE', name: 'Female' },
  { value: 'NEUTRAL', name: 'Both' }
]

export const AUDIO_FORMATS = [
  { value: 'audio/mpeg', name: '.mp3' },
  { value: 'audio/wav', name: '.wav' }
]

export const VOICE_TYPES_VALUES = VOICE_TYPES.map(el => el.value)

export const VOICE_GENDERS_VALUES = VOICE_GENDERS.map(el => el.value)

export const AUDIO_FORMATS_VALUES = AUDIO_FORMATS.map(el => el.value)
