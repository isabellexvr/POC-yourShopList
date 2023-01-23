import { UserEntity, SessionsArray } from './../protocols/usersProtocols';
import { QueryResult } from "pg";
import { connection } from "../database/db";

async function getUserByEmail(email: string): Promise<QueryResult<UserEntity>> {

    const user = await connection.query("SELECT * FROM users WHERE email=$1", [email]);

    return user
}

function createSession(userId: number, token: string): Promise<QueryResult<SessionsArray>> {

    return connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [userId, token])
}

function findSession(userId:number): Promise<QueryResult<SessionsArray>>{

    return connection.query(`SELECT * FROM sessions WHERE "userId"=$1`,[userId])
}

function createUser(name:string, email: string, password: string): Promise<QueryResult<UserEntity>>{
    return connection.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3);", [name, email, password]);
}

function deleteSession(userId: number): Promise<QueryResult>{
    return connection.query(`DELETE FROM sessions WHERE "userId"=$1`, [userId])
}

const userRepository = {
    getUserByEmail,
    createSession,
    findSession,
    createUser,
    deleteSession
}

export default userRepository