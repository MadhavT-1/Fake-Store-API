const express = require('express')
const router = express.Router()
const CartController = require('../Controller/CartController')
const auth = require('../middleware/Auth')

router.get('/myCart', auth, CartController.getMyCart);


module.exports = router