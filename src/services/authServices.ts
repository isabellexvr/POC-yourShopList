import dotenv from "dotenv"
import { UserEntity } from "../protocols/usersProtocols";
import { SignIn, Session } from "../protocols/usersProtocols";
import { invalidEmailError } from "../errors/signInErrors";
import { invalidPasswordError } from "../errors/signInErrors";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { getUserByEmail, createSession } from "../repositories/userRepository";

dotenv.config()

async function signIn(data: SignIn): Promise<Session> {
    const { email, password } = data

    const userExistence = await checkUserExistence(email)

    validatePassword(password, userExistence.password)

    const token = await createNewSession(userExistence.id)

    return {
        userId: userExistence.id,
        token
    }
}

async function checkUserExistence(email: string): Promise<UserEntity> {
    const user = await getUserByEmail(email)
    if (user.rows.length <= 0) throw invalidEmailError()
    return user.rows[0]
}

export async function validatePassword(insertedPassword: string, password: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(insertedPassword, password)
    if (!isPasswordValid) throw invalidPasswordError()
    return true
}

export async function createNewSession(userId: number): Promise<string> {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string)
    await createSession(userId, token)
    return token
}

const authServices = {
    signIn,
}

export default authServices