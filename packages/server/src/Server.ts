import * as express from "express"
import cors from "cors"
import { users, verify } from "./poc/Firebase"

const app = express.default()
app.use(cors())

const port = 5000

app.get("/", (req, res) => res.send("Hello World!"))

app.post("/users", async (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1]
    const currentUser = await verify(token)
    if (currentUser) {
      const usersList = await users()
      res.json(usersList)
      return
    }
  }
  res.sendStatus(401)
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
