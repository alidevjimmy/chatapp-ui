import styles from '../styles/Home.module.css'
import Link from "next/link"

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <Link href="/login">login</Link>
    </div>
  )
}
