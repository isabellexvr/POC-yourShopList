import { QueryResult } from 'pg';
import { List, ItemEntity } from './../protocols/listsProtocols';
import { Request, Response } from "express"
import { connection } from "../database/db"

export async function createList(req: Request, res: Response) {
    const { listName } = req.body
    const userId = res.locals.userId
    try {
        //checar se há uma lista de mesmo nome já registrada por esse usuário, se sim, não deixar
        await checkListExistence(listName, userId)
        const createList = await connection.query(`INSERT INTO lists ("listName", "userId") VALUES ($1,$2) RETURNING id;`, [listName, userId])
        res.status(201).send({ listId: createList.rows[0].id, message: "Lista criada com sucesso." })
    } catch (error: any) {
        if (error.name === "list_name_error") res.status(409).send(error.message)
        if (error.name === "no_lists_found") res.status(404).send(error.message)
        res.sendStatus(500)
        console.log(error)
    }
}

export async function addItemToList(req: Request, res: Response) {
    const listId = req.params
    const { itemName } = req.body
    const userId = res.locals.userId
    //checar se a lista é mesmo do usuário
    try {
        checkIfListBelongsToUser(userId, Number(listId))
        const itemId = await checkItemExistence(itemName)
        await connection.query(`INSERT INTO "listsItems" ("listId", "itemId") VALUES ($1,$2)`, [listId, itemId])
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

async function checkListExistence(listName: string, userId: number): Promise<QueryResult<List>> {
    const checkListName: QueryResult<List> = await connection.query(`SELECT * FROM lists WHERE "listName"=$1 AND "userId"=$2;`, [listName, userId])
    if (checkListName.rows.length > 0) throw { name: "list_name_error", message: "this list name is already being used" }
    return checkListName
}

async function checkItemExistence(itemName: string) {
    const checkItemName: QueryResult<ItemEntity> = await connection.query(`SELECT * FROM items WHERE "itemName"=$1;`, [itemName])
    if (checkItemName.rows.length > 0) return checkItemName.rows[0].id
    const newItem = await connection.query(`INSERT INTO items ("itemName") VALUES ($1) RETURNING id;`, [itemName])
    return newItem.rows[0].id
}

async function checkIfListBelongsToUser(userId: number, listId: number) {
    const list = await connection.query(`SELECT * FROM lists WHERE "userId"=$1, "listId"=$2;`)
    if (list.rows.length <= 0) throw { name: "no_lists_found", message: "list not found or not attached to this user" }
}