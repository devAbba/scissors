const Joi = require('joi');

UrlCreateSchema = Joi.object({
    full: Joi.string()
        .pattern(new RegExp(
            '((http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*))'
        ))
        .min(15)
        .required(),
    tag: Joi.string()
        .trim()
        .min(4)
        .max(20)
        .optional() 
})

async function CreateUrlValidationMW (req, res, next){
    const urlPayLoad = req.body

    try {
        await UrlCreateSchema.validateAsync(urlPayLoad)
        next()
    }
    catch (error){
        next({
            error: error.details[0].message,
            status: 400
        })
    }
}


module.exports = { CreateUrlValidationMW }