import ClientPromise from "../../utils/mongo";
import styles from "../../styles/end.module.scss"
import {ObjectId} from "mongodb";
import MediaEnd from "../../components/mediaEnd";
import {useRouter} from "next/router";

export default function EndId({games, mainGame}) {
  const navigate = useRouter().push

  return (
      <section className={styles.end}>
        <header>
          <h1>
            <span>{mainGame.name} </span>
            unded up in the
            <span> no. {games.findIndex(game => game._id === mainGame._id) + 1} </span>
            spot
          </h1>
        </header>
        <ul>
          {games.map((game, index) => (
              <MediaEnd data={game} key={index} main={game._id === mainGame._id}/>
          ))}
          <li onClick={() => navigate("/game")}><p>Back home</p></li>
        </ul>
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
