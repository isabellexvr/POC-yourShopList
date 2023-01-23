import { QueryResult } from 'pg';
import { List, ItemEntity } from './../protocols/listsProtocols';
import { Request, Response } from "express"
import { connection } from "../database/db"
import listsRepository from '../repositories/listsRepository';
import listsServices from '../services/listsServices';

async function createList(req: Request, res: Response) {
    const { listName } = req.body as List
    const userId = res.locals.userId as number
    try {
        await listsServices.checkListExistence(listName, userId)
        const createList = await listsRepository.insertList(listName, userId)
        res.status(201).send({ listId: createList.rows[0].id, message: "Lista criada com sucesso." })
    } catch (error: any) {
        if (error.name === "list_name_error") res.status(409).send(error.message)
        if (error.name === "no_lists_found") res.status(404).send(error.message)
        res.sendStatus(500)
        console.log(error)
    }
}

async function addItemToList(req: Request, res: Response) {

    const { listId } = req.params
    const { itemName } = req.body
    const userId = res.locals.userId

    try {
        listsServices.checkIfListBelongsToUser(userId, Number(listId))

        const itemId = await listsServices.checkItemExistence(itemName)

        await listsRepository.insertIntoList(Number(listId), itemId)

        res.status(201).send("Item adicionado à lista com sucesso.")

    } catch (error) {

        res.sendStatus(500)
        console.log(error)
    }
}

async function getAllListsByUser(req: Request, res: Response) {
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

async function getListById(req: Request, res: Response) {
    const userId = res.locals.userId;
    const { listId } = req.params
    try {
        await listsServices.checkIfListBelongsToUser(userId, Number(listId))
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

async function deleteList(req: Request, res: Response) {
    const userId = res.locals.userId;
    const { listId } = req.params;
    try {
        await listsServices.checkIfListBelongsToUser(userId, Number(listId));
        await connection.query(`DELETE FROM lists WHERE "listId"=$1 AND "userId"=$2;`, [Number(listId), userId]);
        await connection.query(`DELETE FROM "listsItems" WHERE "listId"=$1`, [Number(listId)])
        return res.status(200).send("Lista deletada com sucesso.")
    } catch (error) {
        if (error.name === "no_lists_found") res.status(404).send(error.message)
        res.sendStatus(500)
        console.log(error)
    }
}

async function deleteItemFromList(req: Request, res: Response) {
    const userId = res.locals.userId;
    const { listId } = req.params;
    const { itemName } = req.body;
    try {
        await listsServices.checkIfListBelongsToUser(userId, Number(listId));
        const itemId = await listsServices.checkItemExistence(itemName);
        await connection.query(`DELETE FROM "listsItems" WHERE "listId"=$1 AND "itemId"=$2`, [Number(listId), Number(itemId)])
        res.status(200).send(`O item ${itemName} foi deletado da lista com sucesso.`)
    } catch (error) {
        if (error.name === "no_lists_found") res.status(404).send(error.message)
        res.sendStatus(500)
        console.log(error)
    }

}

const listsController = {
    createList,
    addItemToList,
    getAllListsByUser,
    getListById,
    deleteList,
    deleteItemFromList
}

export default listsController