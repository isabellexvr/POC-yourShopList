import express from "express";
import { registerNewUser } from "./controllers/registerNewUser";
import dotenv from "dotenv"

dotenv.config()
const server = express()
server.use(express.json())

server.get("/health", (req, res) => {
    res.status(200).send('OK!')
})

server.post("/sign-up", registerNewUser)

const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})