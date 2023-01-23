import express from "express";
import { registerNewUser } from "./controllers/registerController";
import { validate } from "./middlewares/validationMiddleware";
import registrationSchema from "./schemas/registrationSchema";
import loginSchema from "./schemas/loginSchema";
import { userSignIn, logout } from "./controllers/loginController";
import { errorsHandling } from "./middlewares/errorsHandlingMiddleware";
import { validateAuthorization } from "./middlewares/authValidationMiddleware";
import listsController from "./controllers/listsController"
import listSchema from "./schemas/listSchema";
import itemSchema from "./schemas/itemSchema";

const server = express()
server.use(express.json())

server.get("/health", (req, res) => {
    res.status(200).send('OK!')
})

server.post("/sign-up", validate(registrationSchema), registerNewUser);
server.post("/sign-in", validate(loginSchema), userSignIn);
server.use(validateAuthorization);
server.delete("/logout", logout);
server.post("/new-list", validate(listSchema), listsController.createList);
server.delete("/delete-list/:listId", listsController.deleteList)
server.post("/add-item-to-list/:listId", validate(itemSchema), listsController.addItemToList);
server.get("/get-all-lists", listsController.findAllListsByUser);
server.get("/get-list-by-id/:listId", listsController.getListById);
server.delete("/delete-item-from-list/:listId", validate(itemSchema), listsController.deleteItemFromList)
server.use(errorsHandling);

const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})