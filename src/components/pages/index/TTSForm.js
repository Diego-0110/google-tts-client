import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Textarea from '@/components/input/Textarea'
import Select from '@/components/input/Select'
import InputRange from '@/components/input/InputRange'
import Button from '@/components/interactivity/Button'

import { ttsFormSchema } from '@/constants/ttsFormSchema'
import { VOICE_TYPES, VOICE_GENDERS, AUDIO_FORMATS } from '@/constants/ttsFormValues'

import styles from '@/styles/pages/index/TTSForm.module.css'

export default function TTSForm ({ voices, languages, onSubmit }) {
  const {
    register, handleSubmit, watch, formState: { errors }, reset
  } = useForm({
    resolver: zodResolver(ttsFormSchema)
  })
  const [filteredVoices, setFilterdVoices] = useState([])

  useEffect(() => {
    let newValue = voices.filter(voice => {
      return voice.languageCodes.includes(watch('voice-lang')) &&
        (watch('voice-type') === 'All' ||
          voice.name.includes(watch('voice-type'))) &&
        (watch('voice-gender') === 'NEUTRAL' ||
          voice.ssmlGender === watch('voice-gender'))
    })
    newValue = newValue.map(voice => {
      return {
        value: voice.name
      }
    })
    setFilterdVoices(newValue)
  }, [voices, watch('voice-lang'), watch('voice-type'), watch('voice-gender')])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Textarea name='text' rows={10} register={register} watch={watch}
        placeholder={'Write what you want to hear...'} error={errors.text} />
      <div className={styles.options}>
        <Select options={languages} label='Language' name='voice-lang'
          register={register} validation={{}} error={errors['voice-lang']} />
        <Select options={VOICE_TYPES} label='Type' name='voice-type'
          register={register} validation={{}} error={errors['voice-type']} />
        <Select options={VOICE_GENDERS} label='Gender' name='voice-gender'
          register={register} validation={{}} error={errors['voice-gender']} />
        <Select options={filteredVoices} label='Voice' name='voice-name'
          register={register} validation={{}} error={errors['voice-name']} />
        <InputRange label='Speed' name='voice-speed' register={register}
          validation={{}} min={0.25} max={4.0} step={0.01}
          defaultValue={1} watch={watch} error={errors['voice-speed']} />
        <InputRange label='Pitch' name='voice-pitch' register={register}
          validation={{}} min={-20} max={20} step={0.01}
          defaultValue={0} watch={watch} error={errors['voice-pitch']} />
        <Select options={AUDIO_FORMATS} label='Audio format' name='audio-format'
          register={register} validation={{}} error={errors['audio-format']} />
      </div>
      <div className={styles.controls}>
        <Button type={'reset'} onClick={() => reset()}>Reset</Button>
        <Button type={'submit'}>Convert to Voice</Button>
      </div>
    </form>
  )
}
