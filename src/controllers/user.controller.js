const userService = require('../services/user.service')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = async function (req, res){
    try {
        const { email, password } = req.body
        const user = await userService.createUser(email, password)
        if (user){
            delete user.password;

            res.status(201).json({
                message: "user profile created successfully", 
                user: user
            })
        } 
    }
    catch (error){
        if (error.code === 11000) {
            res.status(400).json({
                status: false,
                error: "User already exists"
            })    
        }
        console.log(error)  
    }
}

exports.login = async function (req, res){
    try {
        const { email, password } = req.body
        const user = await userService.findUser(email)
        const userMatch = user === null ? false : await bcrypt.compare(password, user.password)
        
        if (!(user && userMatch)) {
            return res.status(401).json({
                error: "invalid username or password"
            })
        }
        
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            process.env.SECRET,
            {
                expiresIn: 60 * 60 //1hr
            }
        )

        
        res.cookie("api-auth", token, {
            secure: true,
            httpOnly: true,
            maxAge: 3600 * 1000 //1hr
        })
        
        return res.json({
            message: "success",
            token
        })
    
    }
    catch (error){
        console.log(error)
    }
}


