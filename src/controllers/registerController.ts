import { QueryResult } from 'pg';
import { User } from '../protocols/usersProtocols';
import { Request, Response } from "express";
import brcrypt from "bcrypt"
import { connection } from '../database/db';
import { userAlreadyExistsError } from '../errors/signUpErrors';
import userRepository from '../repositories/userRepository';

export async function registerNewUser(req: Request, res: Response) {
    const { name, email, password } = req.body as User;
    const hashedPassword: string = brcrypt.hashSync(password, 10);

    try {
        const isThereAnyUser = await userRepository.getUserByEmail(email);
        if (isThereAnyUser.rows.length > 0) throw userAlreadyExistsError();

        await connection.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3);", [name, email, hashedPassword]);

        res.status(201).send("Usuário registrado com sucesso.");
    } catch (error: any) {
        if (error.name === "user_conflict") {
            res.status(404).send(error.message);
        } else {
            res.status(500).send("Internal server error. Consult the logs.");
            console.log(error);
        }
    }
}