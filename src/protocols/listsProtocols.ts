export type ListEntity = {
    id: number,
    listName: string,
    userId: number
}

export type List = Omit<ListEntity, "id">