import { QueryResult } from "pg";
import { connection } from "../database/db";
import { Session } from "../protocols/usersProtocols";

export async function findSession(token: string, userId: number):Promise<QueryResult<Session>>{
    return connection.query(`SELECT * FROM sessions WHERE "userId"=$1 AND token=$2`,[userId, token])
}