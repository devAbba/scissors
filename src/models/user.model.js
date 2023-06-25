const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    shortUrl: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Url'
        }
    ]
})

userSchema.pre('save', async function(next){
    const user = this;

    if (!user.isModified('password')){
        return next()
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

const User = model('User', userSchema)

module.exports = User