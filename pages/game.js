import ClientPromise from "../utils/mongo"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import styles from '../styles/game.module.scss'
import Media from "../components/media";
import {useRouter} from "next/router";
import {useState} from "react";

export default function Home({games}) {
  const [gamesState, setGamesState] = useState(games)
  const [list] = useAutoAnimate()
  const navigate = useRouter().push

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.name.value
    console.log(name, typeof name)
    const body = {
      name: name
    }

    let data = await fetch("/api/pcgames", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    const id = await data.json()

    if (gamesState.length !== 0 && gamesState.some(game => game.points >= 1960)) {
      await navigate(`/battle/${id.id}`)
    } else {
      setGamesState(prevState => [...prevState, {
        _id: id,
        points: 2000,
        name: name,
        type: "pcgames"
      }])
    }
  }

  return (
    <div className={styles.container}>
      <ul ref={list}>
        <li>
          <form onSubmit={e=> handleSubmit(e)} method={"POST"}>
            <input id="name" name={"name"} type="text" placeholder={"Name your game"}/>
            <input type="submit" value="Add new"/>
          </form>
        </li>
        {gamesState.map((game, i) =>
            <Media List={gamesState} setList={setGamesState} data={game} key={i} />
        )}
      </ul>
    </div>
  )
}

export async function getServerSideProps() {
  const client = await ClientPromise
  const db = client.db("test")

  let games = await db.collection("pcgames").aggregate(
      [{$sort: {points: -1}}]
  ).toArray()
  games = JSON.parse(JSON.stringify(games))

  return {
    props: {
      games
    }
  }
}
