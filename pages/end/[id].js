import ClientPromise from "../../utils/mongo";
import styles from "../../styles/Home.module.css"
import {ObjectId} from "mongodb";

export default function EndId({games, mainGame}) {

  return (
      <section>
        <h1>{mainGame.name} unded up in the no. {games.indexOf(mainGame)} spot</h1>
        {games.map((game, index) => (
            <div className="game" key={index}>
              <p className={game._id === mainGame._id ? styles.blue : ""}>
                <span>{index + 1}. </span>
                {game.name}
                <span className="points"> {game.points}pt</span>
              </p>
            </div>
        ))}
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
        .aggregate([{$sort: {points: -1, name: 1}}])
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