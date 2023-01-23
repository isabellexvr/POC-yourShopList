import { UserEntity } from "../protocols/usersProtocols";
import { SignIn, Session } from "../protocols/usersProtocols";
import { invalidEmailError } from "../errors/signInErrors";
import { invalidPasswordError } from "../errors/signInErrors";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userRepository from "../repositories/userRepository"

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
    const user = await userRepository.getUserByEmail(email)
    if (user.rows.length <= 0) throw invalidEmailError()
    return user.rows[0]
}

async function validatePassword(insertedPassword: string, password: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(insertedPassword, password)
    if (!isPasswordValid) throw invalidPasswordError()
    return true
}

async function createNewSession(userId: number): Promise<string> {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {expiresIn: 18000})
    await userRepository.createSession(userId, token)
    return token
}

async function checkSessionExistence(userId: number) {
    const session = await userRepository.findSession(userId)

    return session
}

const authServices = {
    signIn,
    checkSessionExistence
}

export default authServices