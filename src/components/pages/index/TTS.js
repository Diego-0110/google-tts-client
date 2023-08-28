'use client'
import { useState } from 'react'
import { callTTS } from '@/services/callTTS'
import TTSForm from './TTSForm'
import TTSOutput from './TTSOutputs'

export default function TTS ({ voices, languages }) {
  const [isLoading, setIsLoading] = useState(false)
  const [output, setOutput] = useState(null)
  const [prevOutputs, setPrevOutputs] = useState([])
  const [requestError, setRequestError] = useState(null)

  const onSubmit = async (data) => {
    setIsLoading(true)
    setRequestError(null)
    callTTS({ data }).then(response => {
      if (output) {
        setPrevOutputs([...prevOutputs, output])
      }
      setOutput(response.audioDataURL)
    }).catch((e) => {
      console.log(e.message)
      setRequestError(e.message)
      if (output) {
        setPrevOutputs([...prevOutputs, output])
      }
      setOutput(null)
    }).finally(() => {
      setIsLoading(false)
    })
  }
  return (
    <>
      <TTSForm voices={voices} languages={languages} onSubmit={onSubmit}/>
      <TTSOutput output={output} prevOutputs={prevOutputs} isLoading={isLoading}
        requestError={requestError}/>
    </>
  )
}
