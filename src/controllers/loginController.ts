import {Request, Response} from "express"
import authServices from "../services/authServices"
import { SignIn } from "../protocols/usersProtocols"
import { connection } from "../database/db"

export async function userSignIn(req: Request, res: Response) {
    const { email, password } = req.body as SignIn
    try {
        const userInfo = await authServices.signIn({ email, password })
        return res.status(200).send(userInfo)
    } catch (error: any) {
        if (error.name === "user_not_found_error" || error.name === "incorrect_password_error") {
            res.status(401).send(error.message)
        } else {
            res.sendStatus(500)
            console.log(error)
        }
    }
}

export async function logout(req: Request, res: Response){
    const userId = res.locals.userId

    try{
        await connection.query(`DELETE FROM sessions WHERE "userId"=$1`, [userId])
        res.status(200).send("Usuário deslogado com sucesso.")
    }catch(error: any){
        console.log(error)
    }
}