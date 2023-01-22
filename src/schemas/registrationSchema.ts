import joi from "joi";

const registrationSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required()
})

export default registrationSchema