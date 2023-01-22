import express from "express";
import { registerNewUser } from "./controllers/registerController";
import dotenv from "dotenv"
import { validate } from "./middlewares/validationMiddleware";
import registrationSchema from "./schemas/registrationSchema";
import loginSchema from "./schemas/loginSchema";
import { userSignIn } from "./controllers/loginController";


dotenv.config()
const server = express()
server.use(express.json())

server.get("/health", (req, res) => {
    res.status(200).send('OK!')
})

server.post("/sign-up", validate(registrationSchema), registerNewUser)
server.post("/sign-in", validate(loginSchema), userSignIn)

const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})