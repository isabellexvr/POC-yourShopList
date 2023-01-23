import { Request, Response } from "express"
import authServices from "../services/authServices"
import { SignIn } from "../protocols/usersProtocols"
import userRepository from "../repositories/userRepository"

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

export async function logout(req: Request, res: Response) {

    const userId = res.locals.userId

    try {
        const session = await authServices.checkSessionExistence(userId);

        if (session.rows.length <= 0) throw { name: "non_existent_session_error", message: "this session already doesn't exists" };

        await userRepository.deleteSession(userId);

        res.status(200).send("Usuário deslogado com sucesso.");

    } catch (error: any) {

        if (error.name === "non_existent_session_error") return res.status(409).send(error.message)

        console.log(error)
        res.sendStatus(500)
    }
}