import { NextFunction, Request, Response } from "express"
import { alreadyLogged, unauthorizedError } from "../errors/signInErrors";
import { findSession } from "../repositories/sessionsRepository";
import jwt from "jsonwebtoken";

type JWTPayload = {
    userId: number
}

export async function validateAuthorization(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        throw unauthorizedError()
    }
    try {

        const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload
        res.locals.userId = userId

    } catch (error: any) {
        if (error.name === "unauthorized_error") {
            return res.status(401).send(error.message)
        }
        if(error.name === "JsonWebTokenError"){
            return res.status(401).send(error.message)
        }
        if (error.name === "already_logged_error") {
            return res.status(409).send(error.message)
        }else {
            res.status(401).send(error)
            console.log(error)
        }
        
    }
    next()
}