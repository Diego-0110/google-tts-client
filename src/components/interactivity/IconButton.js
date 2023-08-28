import styles from '@/styles/components/IconButton.module.css'

export default function IconButton ({ children, onClick }) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
