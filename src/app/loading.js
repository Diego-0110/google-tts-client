import styles from '@/styles/pages/index/loading.module.css'

export default function Loading () {
  // Only showed if revalidation in page.js is equal to 0
  return (
    <main className={styles.main}>
      <section className={styles.textArea}></section>
      <section className={styles.options}></section>
      <section className={styles.output}></section>
    </main>
  )
}
