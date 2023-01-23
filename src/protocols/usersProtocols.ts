export type UserEntity = {
    id: number,
    name: string,
    email: string,
    password: string
}

export type User = Omit<UserEntity, "id">

export type SignIn = Omit<UserEntity, "id"|"name">

export type Session = {
    userId: number,
    token: string
}

export type SessionsArray = Session[]