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