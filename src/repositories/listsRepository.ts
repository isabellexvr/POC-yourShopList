import { QueryResult } from 'pg';
import { connection } from "../database/db";
import { ListEntity } from '../protocols/listsProtocols';

function insertList(listName: string, userId: number): Promise<QueryResult<ListEntity>>{
    return connection.query(`INSERT INTO lists ("listName", "userId") VALUES ($1,$2) RETURNING id;`, [listName, userId])
}


const listsRepository = {
    insertList,
}

export default listsRepository