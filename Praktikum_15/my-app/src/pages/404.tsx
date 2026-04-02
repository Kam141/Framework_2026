import styles from '@/styles/404.module.scss'
import Link from 'next/link'

const Custom404 = () => {
  return (
    <div className={styles.error}>
            <title>404</title>

      <Link href="/" className={styles.back}>
         ← Kembali ke Home
      </Link>      
      <img src="/page-not-found.png" alt="404" className={styles.error__image} />

      <h1 className={styles.error__title}>404 - Halaman Tidak Ditemukan</h1>
      <p className={styles.error__desc}>Maaf, halaman yang Anda cari tidak ada.</p>
    </div>
  )
}

export default Custom404