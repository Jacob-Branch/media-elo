import ClientPromise from "../../utils/mongo"
import {ObjectId} from "mongodb";


export default async function handler(req, res) {
  const body = req.body
  const id = body.id
  const type = "pcgames"
  const client = await ClientPromise
  const db = client.db("test")
  let coll = await db.collection(type)

  if (req.method === "DELETE") {
    await coll.deleteOne({_id: new ObjectId(id)})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    res.status(200)
        .send(JSON.parse(JSON.stringify({"msg": `${id} has been deleted`})))
  }

  else {
    return res.status(400).json({ data: 'Ya did som bad' })
  }
}
