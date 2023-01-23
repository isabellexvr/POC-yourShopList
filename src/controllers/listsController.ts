import { QueryResult } from 'pg';
import { List, ItemEntity } from './../protocols/listsProtocols';
import { Request, Response } from "express"
import { connection } from "../database/db"
import listsRepository from '../repositories/listsRepository';

export async function createList(req: Request, res: Response) {
    const { listName } = req.body as List
    const userId = res.locals.userId as number
    try {
        await checkListExistence(listName, userId)
        const createList = await listsRepository.insertList(listName, userId)
        res.status(201).send({ listId: createList.rows[0].id, message: "Lista criada com sucesso." })
    } catch (error: any) {
        if (error.name === "list_name_error") res.status(409).send(error.message)
        if (error.name === "no_lists_found") res.status(404).send(error.message)
        res.sendStatus(500)
        console.log(error)
    }
}

export async function addItemToList(req: Request, res: Response) {

    const { listId } = req.params
    const { itemName } = req.body
    const userId = res.locals.userId

    try {
        checkIfListBelongsToUser(userId, Number(listId))

        const itemId = await checkItemExistence(itemName)

        await connection.query(`INSERT INTO "listsItems" ("listId", "itemId") VALUES ($1,$2)`, [listId, itemId])

        res.status(201).send("Item adicionado à lista com sucesso.")

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

    const checkItemName: QueryResult<ItemEntity> = await connection.query(`SELECT * FROM items WHERE "itemName"=$1;`, [itemName]);

    if (checkItemName.rows.length > 0) return checkItemName.rows[0].id;

    const newItem = await connection.query(`INSERT INTO items ("itemName") VALUES ($1) RETURNING id;`, [itemName]);

    return newItem.rows[0].id;

}

async function checkIfListBelongsToUser(userId: number, listId: number) {

    const list = await connection.query(`SELECT * FROM lists WHERE "userId"=$1 AND id=$2;`, [userId, listId]);

    if (list.rows.length <= 0) throw { name: "no_lists_found", message: "list not found or not attached to this user" };
    return list.rows[0].id

}

export async function getAllListsByUser(req: Request, res: Response) {
    const userId = res.locals.userId;
    //tipo de array de objetos >>daquele<< tipo o.o
    //verificar erro >:(
    try {
        const lists = await connection.query(`
    SELECT 
        u."name" as owner,
        l."listName",
        ARRAY_TO_JSON(
            ARRAY_AGG(
                JSONB_BUILD_OBJECT(
                    'item', i."itemName" 
                ) 
            ) 
        ) AS items
    FROM lists l 
    JOIN "listsItems" li 
        ON l.id =li."listId" 
    JOIN users u 
        ON l."userId"=u.id
    JOIN items i
        ON i.id = li."itemId" 
    WHERE u.id=$1
    GROUP BY u.id, l.id
    ;`, [userId])
        res.status(200).send(lists.rows)
    } catch (error) {
        console.log(error)
    }
}

export async function getListById(req: Request, res: Response) {
    const userId = res.locals.userId;
    const { listId } = req.params
    try {
        await checkIfListBelongsToUser(userId, Number(listId))
        const list = await connection.query(`
    SELECT 
        u."name" as owner,
        l."listName",
        ARRAY_TO_JSON(
            ARRAY_AGG(
                JSONB_BUILD_OBJECT(
                    'item', i."itemName" 
                ) 
            ) 
        ) AS items
    FROM lists l 
    JOIN "listsItems" li 
        ON l.id =li."listId" 
    JOIN users u 
        ON l."userId"=u.id
    JOIN items i
        ON i.id = li."itemId" 
    WHERE l.id=$1 AND u.id=$2
    GROUP BY u.id, l.id
    ;
        `, [listId, userId]);
        res.status(200).send(list.rows)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteList(req: Request, res: Response) {
    const userId = res.locals.userId;
    const { listId } = req.params;
    try {
        await checkIfListBelongsToUser(userId, Number(listId));
        await connection.query(`DELETE FROM lists WHERE "listId"=$1 AND "userId"=$2;`, [Number(listId), userId]);
        await connection.query(`DELETE FROM "listsItems" WHERE "listId"=$1`, [Number(listId)])
        return res.status(200).send("Lista deletada com sucesso.")
    } catch (error) {
        if (error.name === "no_lists_found") res.status(404).send(error.message)
        res.sendStatus(500)
        console.log(error)
    }
}

export async function deleteItemFromList(req: Request, res: Response) {
    const userId = res.locals.userId;
    const { listId } = req.params;
    const { itemName } = req.body;
    try {
        await checkIfListBelongsToUser(userId, Number(listId));
        const itemId = await checkItemExistence(itemName);
        await connection.query(`DELETE FROM "listsItems" WHERE "listId"=$1 AND "itemId"=$2`, [Number(listId), Number(itemId)])
        res.status(200).send(`O item ${itemName} foi deletado da lista com sucesso.`)
    } catch (error) {
        if (error.name === "no_lists_found") res.status(404).send(error.message)
        res.sendStatus(500)
        console.log(error)
    }

}