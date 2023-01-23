import { QueryResult } from 'pg';
import { List, UserLists } from './../protocols/listsProtocols';
import { Request, Response } from "express"
import listsRepository from '../repositories/listsRepository';
import listsServices from '../services/listsServices';
import itemsRepository from '../repositories/itemsRepository';

async function createList(req: Request, res: Response) {
    const { listName } = req.body as List
    const userId = res.locals.userId as number
    try {
        await listsServices.checkListExistence(listName, userId)
        const createList = await itemsRepository.insertList(listName, userId)
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

        await itemsRepository.insertIntoList(Number(listId), itemId)

        res.status(201).send("Item adicionado à lista com sucesso.")

    } catch (error: any) {
        if (error.name === "no_lists_found") res.status(404).send(error.message)
        res.sendStatus(500)
        console.log(error)
    }
}

async function findAllListsByUser(req: Request, res: Response) {

    const userId = res.locals.userId;

    try {
        const lists: QueryResult<UserLists[]> = await listsRepository.getAllListsByUserId(userId)

        res.status(200).send(lists.rows)

    } catch (error: any) {
        res.sendStatus(500)
        console.log(error)
    }
}

async function getListById(req: Request, res: Response) {

    const userId = res.locals.userId;

    const { listId } = req.params

    try {
        await listsServices.checkIfListBelongsToUser(userId, Number(listId));
        
        const list: QueryResult<UserLists> = await listsRepository.getList(Number(listId), userId);

        res.status(200).send(list.rows);
    } catch (error: any) {
        if (error.name === "no_lists_found") res.status(404).send(error.message)
        res.sendStatus(500)
        console.log(error)
    }
}

async function deleteList(req: Request, res: Response) {

    const userId = res.locals.userId;
    const { listId } = req.params;

    try {
        await listsServices.checkIfListBelongsToUser(userId, Number(listId));

        await listsRepository.deleteList(Number(listId), userId);

        await itemsRepository.deleteAllItemsFromList(Number(listId));

        return res.status(200).send("Lista deletada com sucesso.")
    } catch (error: any) {

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

        await itemsRepository.deleteItem(Number(listId), itemId);

        res.status(200).send(`O item ${itemName} foi deletado da lista com sucesso.`);
    } catch (error: any) {
        if (error.name === "no_lists_found") res.status(404).send(error.message)
        res.sendStatus(500)
        console.log(error)
    }

}

const listsController = {
    createList,
    addItemToList,
    findAllListsByUser,
    getListById,
    deleteList,
    deleteItemFromList
}

export default listsController