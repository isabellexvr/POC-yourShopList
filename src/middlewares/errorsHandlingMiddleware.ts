import { ServerError } from "../protocols/errorProtocols";
import { Request, Response, NextFunction } from "express";

export function errorsHandling(err: ServerError, req: Request, res: Response, next: NextFunction) {

    if (err.name === "user_not_found_error") {
        return res.status(404).send(err.message)
    }
    if (err.name === "incorrect_password_error") {
        return res.status(403).send(err.message)
    }
    if (err.name === "unauthorized_error") {
        return res.status(401).send(err.message)
    }
    if (err.name === "non_existent_user") {
        return res.status(404).send(err.message)
    }
    if (err.name === "user_conflict") {
        return res.status(409).send(err.message)
    }
    if (err.name === "unauthorized_error") {
        return res.status(401).send(err.message)
    }
    if (err.name === "already_logged_error") {
        return res.status(409).send(err.message)
    }
    if (err.name === "no_lists_found") { 
        return res.status(404).send(err.message) 
    }
    if (err.name === "list_name_error") { 
        return res.status(404).send(err.message) 
    }

    console.error(err.name);
    res.status(500).send({
        error: "internal_server_error",
        message: "Internal Server Error. Please, check the logs.",
    });
}