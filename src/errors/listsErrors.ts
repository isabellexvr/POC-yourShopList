import { ServerError } from "../protocols/errorProtocols";

export function listNotFoundError(){
    return { name: "list_name_error", message: "this list name is already being used" }
}