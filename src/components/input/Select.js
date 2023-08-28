import styles from '@/styles/components/Select.module.css'

export default function Select ({
  options = [], label, name, register, validation, error = false
}) {
  return (
    <section className={styles.container + (error ? ` ${styles.error}` : '')}>
      {label && <label htmlFor={name} className={styles.label}>{label}</label>}
      <select className={styles.select} id={name} {...register(name, validation)}
        defaultValue={options[0]?.value || null}>
        {options.map(({ value, name }) => {
          return (
            <option key={value} value={value}>{name || value}</option>
          )
        })}
      </select>
      {error && <p className={styles.errorMsg}>{error.message}</p>}
    </section>
  )
}
