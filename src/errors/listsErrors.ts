import { ServerError } from "../protocols/errorProtocols";

export function listNameConflictError(): ServerError{
    return { name: "list_name_error", message: "this list name is already being used" }
}

export function listNotFoundError(): ServerError{
    return { name: "no_lists_found", message: "list not found or not attached to this user" };
}