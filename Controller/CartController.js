const Cart = require('../Models/cart')

module.exports.getMyCart = (req, res) => {
    const userEmail = req.email;

    Cart.findOne({ email: userEmail })
        .then((result) => {
            if (result === null) {
                res.status(200).json({ message: "Your cart is Empty" })
            } else {
                res.status(200).json({ cart: result })
            }

        })
        .catch((err) => {
            res.send("Error : " + err.message)
        })
}