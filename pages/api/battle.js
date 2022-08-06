import ClientPromise from "../../utils/mongo"
import {ObjectId} from "mongodb";
import {matchPoints, probabilityOfWinning} from "../../utils/eloMath";


export default async function handler(req, res) {
  const {playerOne, playerTwo, playerOneW, type} = req.body

  const client = await ClientPromise
  const db = client.db("test")
  let coll = await db.collection(type)
  console.log(req.body)

  if (req.method === "POST") {
    const [Ea, Eb] = probabilityOfWinning(playerOne.points, playerTwo.points)
    const Rating1 = matchPoints(playerOne.points, Ea, (playerOneW ? 1 : 0))
    const Rating2 = matchPoints(playerTwo.points, Eb, (playerOneW ? 0 : 1))

    await coll.updateOne(
        {_id: new ObjectId(playerOne._id)},
        {$set: {points: Rating1}}
    )
    console.log(req.body)
    await coll.updateOne(
        {_id: new ObjectId(playerTwo._id)},
        {$set: {points: Rating2}}
    )
    console.log(req.body)

    res.status(200)
        .send(JSON.parse(JSON.stringify([Rating1, Rating2])))
  }

  else {
    return res.status(400).json({ data: 'Ya did som bad' })
  }
}
