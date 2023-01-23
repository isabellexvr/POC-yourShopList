import { QueryResult } from 'pg';
import { connection } from "../database/db";
import { ListEntity, ListsItemsEntity, ItemEntity } from '../protocols/listsProtocols';

function insertList(listName: string, userId: number): Promise<QueryResult<ListEntity>>{
    return connection.query(`INSERT INTO lists ("listName", "userId") VALUES ($1,$2) RETURNING id;`, [listName, userId])
}

function insertIntoList(listId: number, itemId: number): Promise<QueryResult<ListsItemsEntity>>{
    return connection.query(`INSERT INTO "listsItems" ("listId", "itemId") VALUES ($1,$2)`, [listId, itemId])
}

function getlistByUserId(listName: string, userId: number): Promise<QueryResult<ListEntity>>{
    return connection.query(`SELECT * FROM lists WHERE "listName"=$1 AND "userId"=$2;`, [listName, userId])
}

function getListByListId(userId: number, listId: number): Promise<QueryResult<ListEntity>>{
    return connection.query(`SELECT * FROM lists WHERE "userId"=$1 AND id=$2;`, [userId, listId]);
}

function findItemByName(itemName: string):Promise<QueryResult<ItemEntity>>{
 return connection.query(`SELECT * FROM items WHERE "itemName"=$1;`, [itemName]);
};

function insertNewItem(itemName: string): Promise<QueryResult<ItemEntity>>{
    return connection.query(`INSERT INTO items ("itemName") VALUES ($1) RETURNING id;`, [itemName]);
}

const listsRepository = {
    insertList,
    insertIntoList, 
    getlistByUserId,
    findItemByName,
    insertNewItem,
    getListByListId
}

export default listsRepository