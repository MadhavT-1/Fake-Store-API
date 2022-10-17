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
    res.send("getProductCategories working")
}

module.exports.getProductsInCategory = (req, res) => {
    res.send("getProductsInCategory working")
}

module.exports.getProduct = (req, res) => {
    res.send("getProduct working")
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
    res.send("editProduct working")
}
module.exports.deleteProduct = (req, res) => {
    res.send("deleteProduct working")
}