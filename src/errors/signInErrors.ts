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