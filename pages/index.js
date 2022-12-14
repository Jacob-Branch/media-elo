import styles from '../styles/Home.module.scss'
import Link from 'next/link';

export default function Home() {
    return (
    <div className={styles.container}>
      <img src='/logo.svg' alt='media-elo logo' />
      <header>
        <h1>Media elo</h1>
      </header>
      <p>Compare the media you love using one vs. one comparisons, based on how much you enjoyed that particular piece of media</p>
      <Link href='/game' className='button'>{"Let's go!"}</Link>
    </div>
  )
}

