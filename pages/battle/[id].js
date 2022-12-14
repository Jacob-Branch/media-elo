import ClientPromise from "../../utils/mongo";
import styles from "../../styles/battle.module.scss"
import {ObjectId} from "mongodb";
import { useState } from "react";
import {useRouter} from "next/router";
import MediaBattle from "../../components/mediaBattle"

export default function BattleId({games, mainGame}) {
  const [mainState, setMainState] = useState(mainGame);
  const [battlerState, setBattlerState] = useState(games[0])
  const [updated, setUpdated] = useState(false)
  const navigate = useRouter().push

  const end = (id) => {
    console.log("end")
    navigate(`/end/${id}`)
    console.log("endend")
  }

  const updatePoints = async (p1, p2, w) => {

    if (updated) return;
    console.log(updated)
    setUpdated(true)

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
      console.log("end")
      end(mainState._id)
    }

  }
  const nextMatch = () => {
    setUpdated(false)
    games.shift()
    setBattlerState(games[0])
  }
  return (
      <section className={styles.battle}>
        <header>
          <h1>Battle</h1>
        </header>
        <div>
          <MediaBattle data={mainState} winFunc={() => updatePoints(mainState, battlerState, true)}/>
          <MediaBattle data={battlerState} winFunc={() => updatePoints(mainState, battlerState, false)}/>
        </div>
        {games.length > 1 && <button  onClick={nextMatch}>next matchup</button>}

      </section>
  )
}

export async function getServerSideProps(ctx) {
  const client = await ClientPromise
  const db = client.db("test")
  try {
    let mainGame = await db.collection("pcgames").findOne({_id: new ObjectId(ctx.query.id)})
    let games = await db
        .collection("pcgames").aggregate([
          {
            $match: {
              points: {$gte: mainGame.points - 40},
              _id: {$nin: [new ObjectId(ctx.query.id)]}
            }
          },
          {
            $sort: {
              points: 1,
              name: 1
            }
          }
        ])
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
