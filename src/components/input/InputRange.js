import styles from '@/styles/components/InputRange.module.css'

export default function InputRange ({
  label, name, register, validation, watch, min, max, step, defaultValue,
  error = false
}) {
  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <label htmlFor={name}>{label}</label>
        <span>{watch(name, (defaultValue !== null) ? defaultValue : '')}</span>
      </div>
      <input className={styles.range} type="range" min={min} max={max} step={step}
        {...register(name, validation)} defaultValue={defaultValue}/>
      {error && <p className={styles.errorMsg}>{error.message}</p>}
    </section>
  )
}
