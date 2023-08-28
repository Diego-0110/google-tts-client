import { NextResponse } from 'next/server'
import { ttsFormSchema } from '@/constants/ttsFormSchema'
const textToSpeech = require('@google-cloud/text-to-speech')
require('dotenv').config()

// TTS API only accepts audio enconding as parameter
const FORMAT_TO_ENCODING = {
  'audio/mpeg': 'MP3', // Enconding with loss
  'audio/wav': 'LINEAR16' // Lossless enconding
}
const client = new textToSpeech.TextToSpeechClient()

export async function POST (request) {
  const reqJson = await request.json()
  const validation = ttsFormSchema.safeParse(reqJson)
  if (!validation.success) {
    return NextResponse.json({
      message: 'Server validation failed.',
      errors: validation.error.formErrors.fieldErrors
    }, { status: 400 })
  }
  try {
  // Request Parameters from client
    const text = reqJson.text
    const voiceName = reqJson['voice-name']
    const langCode = reqJson['voice-lang']
    const gender = reqJson['voice-gender']
    const encType = FORMAT_TO_ENCODING[reqJson['audio-format']]
    const speed = reqJson['voice-speed']
    const pitch = reqJson['voice-pitch']

    const gAPIRequest = {
      input: { text },
      // Search the voice name and if is invalid, use the remaining parameters
      voice: { name: voiceName, languageCode: langCode, ssmlGender: gender },
      audioConfig: { audioEncoding: encType, speakingRate: speed, pitch }
    }
    // Text-to-speech request
    let gAPIResponseArray
    try {
      // The API method returns an error when fails.
      gAPIResponseArray = await client.synthesizeSpeech(gAPIRequest)
    } catch (error) {
      return NextResponse.json({
        message: 'API failed to handle the request.'
      }, { status: 502 })
    }
    const [gAPIResponse] = gAPIResponseArray
    // Convert Audio Content from buffer to Base 64
    const audioBuff = Buffer.from(Array.from(gAPIResponse.audioContent))
    const audio = audioBuff.toString('base64')

    const response = {
      audio,
      format: reqJson['audio-format']
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong.'
    }, { status: 500 })
  }
}
