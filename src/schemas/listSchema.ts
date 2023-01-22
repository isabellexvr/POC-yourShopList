import joi from "joi"

const listSchema = joi.object({
    listName: joi.string().min(3).required()
})

export default listSchema