const express = require('express')
const userController = require('../controllers/user.controller')
const { CreateUserValidationMW } = require('../validators/users.validator')

const userRouter = express.Router()

userRouter.get('/signup', function(_req, res){
    res.render('signup.ejs')
})

userRouter.get('/login', function(_req, res){
    res.render('login.ejs')
})

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/

userRouter.post('/signup', CreateUserValidationMW, userController.register)

userRouter.post('/login', userController.login)

module.exports = userRouter