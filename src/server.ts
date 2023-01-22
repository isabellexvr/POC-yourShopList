import express from "express";
import { registerNewUser } from "./controllers/registerNewUser";

const server = express()
server.use(express.json())

server.get("/health", (req, res) => {
    res.status(200).send('OK!')
})

server.post("/sign-up", registerNewUser)

server.listen(4000, () => {
    console.log(`Server is listening on port 4000`)
})