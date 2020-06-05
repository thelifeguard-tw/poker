import * as express from "express"

const app = express.default()

const port = 5000

app.get("/", (req, res) => res.send("Hello World!"))

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
