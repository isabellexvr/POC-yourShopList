import { UserEntity, SessionsArray } from './../protocols/usersProtocols';
import { QueryResult } from "pg";
import { connection } from "../database/db";

async function getUserByEmail(email: string): Promise<QueryResult<UserEntity>> {

    const user = await connection.query("SELECT * FROM users WHERE email=$1", [email]);

    return user
}
//não volta uma session, volta uma array de sessions
async function createSession(userId: number, token: string): Promise<QueryResult<SessionsArray>> {
    return connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [userId, token])
}

async function findSession(userId:number): Promise<QueryResult<SessionsArray>>{
    return connection.query(`SELECT * FROM sessions WHERE "userId"=$1`,[userId])
}

const userRepository = {
    getUserByEmail,
    createSession,
    findSession
}

export default userRepository