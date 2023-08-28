'use client'

import { useEffect } from 'react'
import Button from '@/components/interactivity/Button'

import styles from '@/styles/pages/index/error.module.css'

export default function Error ({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error])

  return (
    <main className={styles.main}>
      <section>
        <h2 className={styles.errorMsg}>{error.message}</h2>
        <Button type={'button'} onClick={() => reset()}>
          Try again
        </Button>
      </section>
    </main>
  )
}
