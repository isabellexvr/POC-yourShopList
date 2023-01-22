import { UserEntity, SignInResult } from './../protocols/usersProtocols';
import { QueryResult } from "pg";
import { connection } from "../database/db";

export async function getUserByEmail(email: string): Promise<QueryResult<UserEntity>> {

    const user = await connection.query("SELECT * FROM users WHERE email=$1", [email]);

    return user
}

export async function createSession(userId: number, token: string): Promise<QueryResult<SignInResult>> {
    return connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [userId, token])
}