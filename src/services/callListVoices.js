import { cache } from 'react'

const textToSpeech = require('@google-cloud/text-to-speech')

require('dotenv').config()

const client = new textToSpeech.TextToSpeechClient()

async function googleListVoiceRequest () {
  let gAPIResponseArray
  try {
    // The API method returns an error when fails.
    gAPIResponseArray = await client.listVoices({})
  } catch (error) {
    throw new Error('API failed to handle the request.')
  }
  try {
    const [listVoicesResponse] = gAPIResponseArray
    // To avoid duplicate data bug in API
    const uniqueNames = new Set()
    const voices = listVoicesResponse.voices.filter(voice => {
      if (uniqueNames.has(voice.name)) {
        return false
      }
      uniqueNames.add(voice.name)
      return true
    })
    return {
      voices
    }
  } catch (error) {
    throw new Error('Something went wrong.')
  }
}

export const callListVoices = cache(async () => {
  return googleListVoiceRequest().then(({ voices }) => {
    try {
      // Get unique Language Codes using the list of voices
      const uniqueLangsBCP47 = [...new Set([].concat(...voices.map(voice => {
        return voice.languageCodes
      })))]
      return {
        voices,
        languageCodes: uniqueLangsBCP47
      }
    } catch (error) {
      throw new Error('Something went wrong.')
    }
  })
})
