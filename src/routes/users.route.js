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

userRouter.post('/signup', CreateUserValidationMW, userController.register)

userRouter.post('/login', userController.login)

module.exports = userRouter