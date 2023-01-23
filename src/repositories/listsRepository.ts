import { UserLists } from './../protocols/listsProtocols';
import { QueryResult } from 'pg';
import { connection } from "../database/db";
import { ListEntity, ListsItemsEntity, ItemEntity } from '../protocols/listsProtocols';
import { UserEntity } from '../protocols/usersProtocols';

function insertList(listName: string, userId: number): Promise<QueryResult<ListEntity>>{
    return connection.query(`INSERT INTO lists ("listName", "userId") VALUES ($1,$2) RETURNING id;`, [listName, userId])
}

function insertIntoList(listId: number, itemId: number): Promise<QueryResult<ListsItemsEntity>>{
    return connection.query(`INSERT INTO "listsItems" ("listId", "itemId") VALUES ($1,$2)`, [listId, itemId])
}

function finglistByUserId(listName: string, userId: number): Promise<QueryResult<ListEntity>>{
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

function getAllListsByUserId(userId: number): Promise<QueryResult<UserLists[]>>{
    return connection.query(`
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
;`, [userId]);
}

function getList(listId: number, userId: number): Promise<QueryResult<UserLists>>{
    return connection.query(`
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
}

const listsRepository = {
    insertList,
    insertIntoList, 
    finglistByUserId,
    findItemByName,
    insertNewItem,
    getListByListId,
    getAllListsByUserId,
    getList
}

export default listsRepository