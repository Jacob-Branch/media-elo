import styles from "./media.module.scss"
import {useRouter} from "next/router";
import {useState} from "react";

export default function Media ({data, key}) {
  const [mountState, setMountState] = useState(true)
  const navigate = useRouter().push
  const goToBattle = (id) => {
    navigate(`/battle/${id}`)
  }

  const deleteSelf = async (id) => {
    let body = {id}
    await fetch("/api/delete", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    console.log("delete")
    setMountState(false)
  }

  return mountState ? (
      <li className={styles.media} key={key}>
        <h3>{data.name}</h3>
        <p>{data.points} pt</p>
        <button onClick={() => deleteSelf(data._id)}>Delete</button>
      </li>
  ) : null;
}