import { QueryResult } from 'pg';
import { List } from './../protocols/listsProtocols';
import { Request, Response } from "express"
import { connection } from "../database/db"

export async function createList(req: Request, res: Response) {
    const { listName } = req.body
    const userId = res.locals.userId
    try {
        //checar se há uma lista de mesmo nome já registrada por esse usuário, se sim, não deixar
        const checkListName: QueryResult<List> = await connection.query(`SELECT * FROM lists WHERE "listName"=$1 AND "userId"=$2`, [listName, userId])
        if (checkListName.rows.length > 0) throw { name: "list_name_error", message: "this list name is already being used" }
        await connection.query(`INSERT INTO lists ("listName", "userId") VALUES ($1,$2)`, [listName, userId])
        res.status(201).send("Lista criada com sucesso!")
    } catch (error: any) {
        if(error.name === "list_name_error") res.status(409).send(error.message)
        console.log(error)
    }
}