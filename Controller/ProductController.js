const Product = require('../Models/Product')


module.exports.getAllProducts = (req, res) => {


    Product.find()
        .sort()
        .then((products) => {
            res.status(200).send(products);
        })
        .catch((err) => {
            res.status(404).json({ message: 'No data found ' + err.message })
        })

}

module.exports.getProductCategories = (req, res) => {
    Product.distinct('category')
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(404).json({ message: 'Not found' })
        })
}

module.exports.getProductsInCategory = (req, res) => {
    const _category = req.params.category
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort == 'desc' ? -1 : 1;

    Product.find({ category: _category })
        .select(['-_id', '-__v'])       //it wont return this values 
        .limit(limit)
        .sort({ id: sort })
        .then((products) => {
            res.status(200).json({ Products: products })
        })
        .catch(() => {
            res.status(404).json({ message: "not found" })
        })

}

module.exports.getProduct = (req, res) => {
    const productId = req.params.id;

    Product.findOne({ id: productId })
        .select(['-_id', '-__v'])
        .then((product) => {
            res.status(200).json({ product })
        })
        .catch((err) => {
            res.status(404).json({ message: "Product Not Found" })
        })
}

module.exports.addProduct = (req, res) => {
    if (req.body === undefined || req.body === null)
        res.status(409).json({ message: "Data is undefined" });

    const prod = req.body;

    const addProd = new Product({
        id: prod.id,
        title: prod.title,
        price: prod.price,
        description: prod.description,
        image: prod.image,
        category: prod.category
    })

    addProd.save()
        .then(() => {
            res.status(201).json({ message: "Product added." })
        })
        .catch((err) => {
            res.status(500).json({ message: "Error in saving data " + err.message })
        })
}

module.exports.editProduct = (req, res) => {
    const prodId = req.params.id;
    const prod = req.body
    if (prod === undefined || prod === null) {
        res.status(500).send("Data is undefined")
    }
    const updateProduct = {

        title: prod.title,
        price: prod.price,
        description: prod.description,
        image: prod.image,
        category: prod.category
    }

    Product.updateOne({ id: prodId }, updateProduct)
        .then(() => {
            res.status(201).json({ message: "Product Updated" })
        })
        .catch((err) => {
            res.status(409).json({ message: "Error in update " + err.message })
        })
}
module.exports.deleteProduct = (req, res) => {
    const prodId = req.params.id;

    Product.deleteOne({ id: prodId })
        .then(() => {
            res.status(200).json({ message: "Product Deleted" })
        })
        .catch((err) => {
            res.status(401).json({ message: "Error in delete :" + err.message })
        })
}