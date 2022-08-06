import ClientPromise from "../utils/mongo"

import styles from '../styles/Home.module.css'
import {useRouter} from "next/router";

const probabilityOfWinning = (Ra, Rb) => {
  const Ea = 1 / (1 + Math.pow(10, (Rb - Ra) / 400))
  const Eb = 1 / (1 + Math.pow(10, (Ra - Rb) / 400))

  return [Ea, Eb]
}

const matchPoints = (Ra, Ea, S) => {
  return Math.round(((Ra + K * (S - Ea)) * 10) / 10).toFixed(0)
}

const getPercent = (x) => {
  return (Math.round(x * 1000) / 10).toFixed(0)
}



export default function Home({games}) {
  const navigate = useRouter().push
  async function getTest() {
    let data = await fetch("/api/pcgames", {
      method: "GET"
    })
    await console.log(data.json())
  }
  const goToBattle = (id) => {
    navigate(`/battle/${id}`)
  }

  return (
    <div className={styles.container}>
      {games.map((game, i) =>
          <div key={i} onClick={() => goToBattle(game._id)}>
            <h2>{game.name}</h2>
          </div>
      )}
      <form action="/api/pcgames" method={"POST"}>
        <input name={"name"} type="text"/>
        <input type="submit" value="Add new"/>
      </form>
      <button onClick={getTest}>Get data</button>
    </div>
  )
}

export async function getServerSideProps() {
  const client = await ClientPromise
  const db = client.db("test")

  let games = await db.collection("pcgames").find({}).toArray()
  games = JSON.parse(JSON.stringify(games))

  return {
    props: {
      games
    }
  }
}