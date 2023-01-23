import { connection } from "../database/db";
import { QueryResult } from "pg";
import { ListEntity, ListsItemsEntity, ItemEntity } from "../protocols/listsProtocols";

function insertList(listName: string, userId: number): Promise<QueryResult<ListEntity>> {
    return connection.query(`INSERT INTO lists ("listName", "userId") VALUES ($1,$2) RETURNING id;`, [listName, userId])
}

function insertIntoList(listId: number, itemId: number): Promise<QueryResult<ListsItemsEntity>> {
    return connection.query(`INSERT INTO "listsItems" ("listId", "itemId") VALUES ($1,$2)`, [listId, itemId])
}

function findItemByName(itemName: string): Promise<QueryResult<ItemEntity>> {
    return connection.query(`SELECT * FROM items WHERE "itemName"=$1;`, [itemName]);
};

function insertNewItem(itemName: string): Promise<QueryResult<ItemEntity>> {
    return connection.query(`INSERT INTO items ("itemName") VALUES ($1) RETURNING id;`, [itemName]);
}

function deleteItem(listId: number, itemId: number): Promise<QueryResult<ListsItemsEntity>>{
    return connection.query(`DELETE FROM "listsItems" WHERE "listId"=$1 AND "itemId"=$2`, [Number(listId), Number(itemId)]);
}

function deleteAllItemsFromList(listId: number): Promise<QueryResult<ListsItemsEntity>>{
    return connection.query(`DELETE FROM "listsItems" WHERE "listId"=$1`, [listId]);
}

const itemsRepository = {
    insertList,
    insertIntoList,
    findItemByName,
    insertNewItem,
    deleteItem,
    deleteAllItemsFromList
}

export default itemsRepository