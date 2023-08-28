import { Figtree } from 'next/font/google'
import { Logo } from '@/components/static/icons'

import styles from '@/styles/components/Navbar.module.css'

const figtree = Figtree({ subsets: ['latin'] })

export default function Navbar () {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Logo width={28}/>
        <span className={`${styles.logoText} ${figtree.className}`}>TTS Client</span>
      </div>
    </nav>
  )
}
