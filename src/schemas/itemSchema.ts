import joi from "joi"

const itemSchema = joi.object({
    itemName: joi.string().min(2).required()
})

export default itemSchema