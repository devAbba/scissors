const User = require('../models/user.model')

exports.createUser = async function(email, password){
    const newUser = new User({
        email,
        password
    })

    const savedUser = await newUser.save()
    return savedUser
}

exports.findUser = async function (email){
    const user = await User.findOne({email: email})
    return user
}