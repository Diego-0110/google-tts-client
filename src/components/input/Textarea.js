import styles from '@/styles/components/Textarea.module.css'

export default function Textarea ({
  children, name, rows, register, validation, watch, placeholder, error = false
}) {
  return (
    <section className={styles.container}>
      <textarea className={styles.textarea} rows={rows}
        {...register(name, validation)} placeholder={placeholder}>
      </textarea>
      <div className={styles.details}>
        {error && <p className={styles.error}>{error.message}</p>}
        <p className={styles.caractersCount}>
          {watch(name, '').length} Characters
        </p>
      </div>
      {children}
    </section>
  )
}
