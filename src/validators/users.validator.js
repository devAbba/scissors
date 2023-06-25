const Joi = require('joi');

UserCreateSchema = Joi.object({
    email: Joi.string()
        .email()
        .min(5)
        .max(50)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(20)
        .required() 
})

async function CreateUserValidationMW (req, res, next){
    const userPayLoad = req.body

    try {
        await UserCreateSchema.validateAsync(userPayLoad)
        next()
    }
    catch (error){
        next({
            error: error.details[0].message,
            status: 400
        })
    }
}


module.exports = { CreateUserValidationMW }