import ClientPromise from "../../utils/mongo"


export default async function handler(req, res) {
  const body = req.body
  const name = body.name
  const type = "pcgames"
  const client = await ClientPromise
  const db = client.db("test")
  let coll = await db.collection(type)

  if (req.method === "POST") {
    await coll.insertOne({name, type, points: 2000})
        .then((resMongo) => res.status(200).send(JSON.parse(JSON.stringify({id: resMongo.insertedId}))))
        .catch(err => console.log(err))
  }

  else {
    return res.status(400).json({ data: 'Ya did som bad' })
  }
}
