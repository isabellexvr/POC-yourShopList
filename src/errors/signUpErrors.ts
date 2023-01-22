import { ServerError } from './../protocols/errorProtocols';

export function nonExistentUserErrror():ServerError{
    return{
        name: "non_existent_user",
        message: "this user does not exist"
    }
}

export function userAlreadyExistsError():ServerError{
    return{
        name: "user_conflict",
        message: "user already exists"
    }
}