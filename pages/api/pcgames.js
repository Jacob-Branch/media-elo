import ClientPromise from "../../utils/mongo"


export default async function handler(req, res) {
  const body = req.body
  const name = body.name
  const type = "pcgames"
  const client = await ClientPromise
  const db = client.db("test")
  let coll = await db.collection(type)

  if (req.method === "POST") {
    let id;
    await coll.insertOne({name, type, points: 2000})
        .then((res) => id = res.insertedId)
    res.status(200).redirect(`/battle/${id}`)
  }

  else if (req.method === "GET") {
    let data = await coll.find({}).toArray()
    res.status(200)
        .send(JSON.parse(JSON.stringify(data)))
        .catch(err => console.log(err))
  }

  else {
    return res.status(400).json({ data: 'Ya did som bad' })
  }
}
