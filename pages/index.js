import ClientPromise from "../utils/mongo"

import styles from '../styles/Home.module.css'
import Media from "../components/media";

export default function Home({games}) {
  return (
    <div className={styles.container}>
      <ul>
        {games.map((game, i) =>
            <Media data={game} key={i} />
        )}
      </ul>
      <form action="/api/pcgames" method={"POST"}>
        <input name={"name"} type="text"/>
        <input type="submit" value="Add new"/>
      </form>
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