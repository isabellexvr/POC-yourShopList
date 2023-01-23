export type ListEntity = {
    id: number,
    listName: string,
    userId: number
}

export type List = Omit<ListEntity, "id">

export type ItemEntity = {
    id: number,
    itemName: string
}

export type Item = Omit<ItemEntity, "id">

export type ListsItemsEntity = {
    id: number,
    listId: number,
    itemId: number
}

export type UserLists = {
    owner: string,
    listName: string,
    items: {item:string}[]
}