import styles from '@/styles/components/Button.module.css'

export default function Button ({ children, onClick, type }) {
  let className = styles.button
  if (type === 'button' || type === 'submit') {
    className += ' ' + styles.primary
  } else {
    className += ' ' + styles.secondary
  }
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  )
}
