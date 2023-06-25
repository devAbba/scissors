const { Schema, model } = require('mongoose')
const shortId = require('shortid')

const urlSchema = new Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        default: shortId.generate
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Url = model('Url', urlSchema)

module.exports = Url;