const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')
const app = express()
const cors = require('cors')
const env = dotenv.config()

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const userRoutes = require('./Routes/UserRoutes')
const productRoutes = require('./Routes/ProductRoutes')
const cartRoutes = require('./Routes/CartRoutes')


app.use('/user', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)

app.get('/', (req, res) => {
    res.send({ message: "Connected" })
})


mongoose.connect(process.env.DB_URL).then(() => {
    app.listen(3000, () => {
        console.log("Connected to server");
    })
})

module.exports = app