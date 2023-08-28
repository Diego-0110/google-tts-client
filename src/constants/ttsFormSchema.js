import * as z from 'zod'
import { VOICE_TYPES_VALUES, VOICE_GENDERS_VALUES, AUDIO_FORMATS_VALUES } from './ttsFormValues'

export const ttsFormSchema = z.object({
  text: z.string().min(1, { message: 'You need to write at least one character!' }),
  'voice-lang': z.string().min(1, { message: 'Required' }), // TODO: check valid Language with Intl
  'voice-type': z.string().refine(val => VOICE_TYPES_VALUES.includes(val),
    { message: 'Invalid type!' }),
  'voice-gender': z.string().refine(val => VOICE_GENDERS_VALUES.includes(val),
    { message: 'Invalid genre!' }),
  'voice-name': z.string(),
  'voice-speed': z.coerce.number().min(0.25, { message: 'Min value: 0.25' })
    .max(4, { message: 'Max value: 4' }),
  'voice-pitch': z.coerce.number().min(-20, { message: 'Min value: -20' })
    .max(20, { message: 'Max value: 20' }),
  'audio-format': z.string().refine(val => AUDIO_FORMATS_VALUES.includes(val),
    { message: 'Invalid format!' })
})
