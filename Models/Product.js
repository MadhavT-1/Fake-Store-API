const mongoose = require('mongoose')
const schema = mongoose.Schema

const productSchema = new schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('product', productSchema)