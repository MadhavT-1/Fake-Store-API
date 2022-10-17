const express = require('express')
const router = express.Router()
const productController = require('../Controller/ProductController')

router.get('/', productController.getAllProducts)
router.get('/categories', productController.getProductCategories)
router.get('/categories/:category', productController.getProductsInCategory)
router.get('/:id', productController.getProduct)
router.post('/', productController.addProduct)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router