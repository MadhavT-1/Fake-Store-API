const mongoose = require('mongoose')
const Product = require('./Product')
const User = require('./User')
const schema = mongoose.Schema

const cartSchema = new schema({
    id: {
        type: Number,
        required: true
    },
    userId: {
        type: schema.Types.Number,
        ref: User,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    products: [{
        productId: {
            type: schema.Types.Number,
            ref: Product,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }

    }]

})

module.exports = mongoose.model('cart', cartSchema)