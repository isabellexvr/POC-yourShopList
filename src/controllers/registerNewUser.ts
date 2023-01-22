import { UserEntity, User } from './../protocols/usersProtocols';
import { Request, Response } from "express";
import brcrypt from "bcrypt"
import { connection } from '../database/db';

export async function registerNewUser(req: Request, res: Response) {
    const { name, email, password } = req.body as User
    const hashedPassword: string = brcrypt.hashSync(password, 10)
    try{
        await connection.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3);", [name, email, hashedPassword])
        res.status(201).send("Usuário registrado com sucesso.")
    }catch(error){
        console.log(error)
    }
}