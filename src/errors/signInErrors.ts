import { ServerError } from "../protocols/errorProtocols"

export function invalidEmailError():ServerError{
    return {
        name: "user_not_found_error", 
        message: "email is incorrect or not registered yet"
    }
}

export function invalidPasswordError():ServerError{
    return {
        name: "incorrect_password_error",
        message: "password is incorrect"
    }
}

export function unauthorizedError():ServerError{
    return {
        name: "unauthorized_error",
        message: "you have no permission to do this"
    }
}

export function alreadyLogged():ServerError{
    return {
        name: "already_logged_error",
        message: "you are already logged, please logout before logging again"
    }
}