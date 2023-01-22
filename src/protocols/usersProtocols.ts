export type UserEntity = {
    id: number,
    name: string,
    email: string,
    password: string
}

export type User = Omit<UserEntity, "id">