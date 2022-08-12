import styles from "./mediaEnd.module.scss"

export default function MediaEnd ({data, key, main}) {

  return (
      <li className={`${styles.mediaEnd} ${main && styles.main}`} key={key}>
        <h3>{data.name}</h3>
        <p>{data.points} pt</p>
      </li>
  )
}