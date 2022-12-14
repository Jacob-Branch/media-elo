import styles from "./mediaBattle.module.scss"

export default function MediaBattle ({data, winFunc}) {

  return (
      <div className={styles.mediaBattle}>
        <div>
          <h3>{data.name}</h3>
          <p>{data.points} pt</p>
        </div>
        <button onClick={winFunc}>I prefer this one</button>
      </div>
  )
}
