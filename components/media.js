import styles from "./media.module.scss"
import {useRouter} from "next/router";

export default function Media ({data, setList, }) {
  const navigate = useRouter().push
  const goToBattle = (id) => {
    navigate(`/battle/${id}`)
  }


  const deleteSelf = async (id) => {
    setList(prevState => {
      return prevState.filter(game => game._id !== id)
    })
    let body = {id}
    await fetch("/api/delete", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    console.log("delete")
  }

  return (
      <li className={styles.media} onClick={(e) => {if (e.target === e.currentTarget) {goToBattle(data._id)}}}>
        <h3>{data.name}</h3>
        <p>{data.points} pt</p>
        <div onClick={() => deleteSelf(data._id)}>
          <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="34.5887" height="3.45887" rx="1.72943" transform="matrix(0.7061 -0.708112 0.7061 0.708112 0 24.5507)" fill="#DF2D2D"/>
            <rect width="34.5887" height="3.45887" rx="1.72943" transform="matrix(0.7061 0.708112 -0.7061 0.708112 2.57697 0)" fill="#DF2D2D"/>
          </svg>
        </div>
      </li>
  )
}