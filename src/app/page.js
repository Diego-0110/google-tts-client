import { callListVoices } from '@/services/callListVoices'
import TTS from '@/components/pages/index/TTS'

import styles from '@/styles/pages/index/page.module.css'

export const revalidate = 60 * 60 // Update every hour

async function getData () {
  return callListVoices().then(response => {
    try {
      // Translate language Codes to language names and regions
      const languageNames = new Intl.DisplayNames(['en'], {
        type: 'language'
      })
      const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
      const languages = response.languageCodes.map(langCode => {
        const [lang, region] = langCode.split('-')
        return {
          value: langCode,
          name: `${languageNames.of(lang)} (${regionNames.of(region)})`
        }
      })
      // Sort in alphabetic order
      languages.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        } else if (a.name < b.name) {
          return -1
        }
        return 0
      })
      return [response.voices, languages]
    } catch (error) {
      throw new Error('Something went wrong.')
    }
  })
}

export default async function Home () {
  const [voices, languages] = await getData()

  return (
    <main className={styles.main}>
      <TTS voices={voices} languages={languages}/>
    </main>
  )
}
