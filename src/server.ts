import express from "express";

const server = express()
server.use(express.json())

server.get("/health", (req, res) => {
    res.status(200).send('OK!')
})

server.listen(4000, () => {
    console.log(`Server is listening on port 4000`)
})