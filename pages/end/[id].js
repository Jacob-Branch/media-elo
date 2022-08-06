import ClientPromise from "../../utils/mongo";
import styles from "../../styles/Home.module.css"
import {ObjectId} from "mongodb";
import { useState } from "react";
import {useRouter} from "next/router";

export default function battleId({games, mainGame}) {
  const [mainState, setMainState] = useState(mainGame);
  const [battlerState, setBattlerState] = useState(games[0])
  const navigate = useRouter().push

  const end = (id) => {
    navigate(`/end/${id}`)
  }

  const updatePoints = async (p1, p2, w) => {

    let body = {
      playerOne: p1,
      playerTwo: p2,
      playerOneW: w,
      type: "pcgames"
    }
    let data = await fetch("/api/battle", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    let points = await data.json()
    setMainState({...mainState, points: points[0]})
    setBattlerState({...battlerState, points: points[1]})

    if (games.length === 1) {
      end(mainState._id)
    }
  }
  const nextMatch = () => {
    games.shift()
    setBattlerState(games[0])
  }
  return (
      <section>
        <h1>Battle</h1>
        <p className={styles.blue}>{mainState.name} <span className="points">{mainState.points}pt</span></p>
        <button onClick={() => updatePoints(mainState, battlerState, true)}>{mainState.name} is better</button>
        <p>{battlerState.name} <span className="points">{battlerState.points}pt</span></p>
        <button onClick={() => updatePoints(mainState, battlerState, false)}>{battlerState.name} is better</button>
        <br/>
        <br/>
        <br/>
        <button  onClick={nextMatch}>next matchup</button>
      </section>
  )
}

export async function getServerSideProps(ctx) {
  const client = await ClientPromise
  const db = client.db("test")
  try {
    let mainGame = await db.collection("pcgames").findOne({_id: new ObjectId(ctx.query.id)})
    let games = await db
        .collection("pcgames")
        .aggregate([{$sort: {points: 1, name: 1}}])
        .toArray()
    games = JSON.parse(JSON.stringify(games))
    mainGame = JSON.parse(JSON.stringify(mainGame))

    return {
      props: {
        games,
        mainGame
      }
    }
  } catch (err) {
    console.log(err)
    return {notFound: true}
  }
}