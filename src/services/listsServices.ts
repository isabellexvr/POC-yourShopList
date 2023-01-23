import { listNotFoundError } from '../errors/listsErrors';
import { List, ItemEntity, ListEntity } from '../protocols/listsProtocols';
import { QueryResult } from 'pg';
import listsRepository from '../repositories/listsRepository';

async function checkListExistence(listName: string, userId: number): Promise<QueryResult<List>> {

    const checkListName: QueryResult<List> = await listsRepository.getlistByUserId(listName, userId);

    if (checkListName.rows.length > 0) throw listNotFoundError();

    return checkListName;
}

async function checkItemExistence(itemName: string): Promise<number> {

    const checkItemName: QueryResult<ItemEntity> = await listsRepository.findItemByName(itemName)

    if (checkItemName.rows.length > 0) return checkItemName.rows[0].id;

    const newItem: QueryResult<ItemEntity> = await listsRepository.insertNewItem(itemName)

    return newItem.rows[0].id;

}

async function checkIfListBelongsToUser(userId: number, listId: number): Promise<number> {

    const list: QueryResult<ListEntity> = await listsRepository.getListByListId(userId, listId)

    if (list.rows.length <= 0) throw { name: "no_lists_found", message: "list not found or not attached to this user" };
    return list.rows[0].id

}

const listsServices = {
    checkListExistence,
    checkItemExistence,
    checkIfListBelongsToUser
}

export default listsServices