import { listNameConflictError, listNotFoundError } from '../errors/listsErrors';
import { List, ItemEntity, ListEntity } from '../protocols/listsProtocols';
import { QueryResult } from 'pg';
import listsRepository from '../repositories/listsRepository';
import itemsRepository from '../repositories/itemsRepository';


async function checkListExistence(listName: string, userId: number): Promise<QueryResult<List>> {

    const checkListName: QueryResult<List> = await listsRepository.finglistByUserId(listName, userId);

    if (checkListName.rows.length > 0) throw listNameConflictError();

    return checkListName;
}

async function checkItemExistence(itemName: string): Promise<number> {

    const checkItemName: QueryResult<ItemEntity> = await itemsRepository.findItemByName(itemName)

    if (checkItemName.rows.length > 0) return checkItemName.rows[0].id;

    const newItem: QueryResult<ItemEntity> = await itemsRepository.insertNewItem(itemName)

    return newItem.rows[0].id;

}

async function checkIfListBelongsToUser(userId: number, listId: number): Promise<number> {

    const list: QueryResult<ListEntity> = await listsRepository.getListByListId(userId, listId);

    if (list.rows.length <= 0) throw listNotFoundError();

    return list.rows[0].id;

};

const listsServices = {
    checkListExistence,
    checkItemExistence,
    checkIfListBelongsToUser
};

export default listsServices;