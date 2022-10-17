const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports.register = (req, res) => {
    const userDetails = req.body;

    if (req.body === undefined) {
        res.json({
            status: 'Error',
            message: 'Data is Undefined'
        })
    }
    else {

        User.findOne({ email: userDetails.email }).then((result) => {

            if (result === undefined || result === null || result.email !== userDetails.email) {
                encryptedPassword = bcrypt.hashSync(userDetails.password, 10)

                let user = new User({
                    email: userDetails.email,
                    username: userDetails.username,
                    password: encryptedPassword,
                    name: {
                        firstname: userDetails.name.firstname,
                        lastname: userDetails.name.lastname
                    },
                    address: {
                        city: userDetails.address.city,
                        street: userDetails.address.street,
                        zipcode: userDetails.address.zipcode
                    },
                    phone: userDetails.phone
                });


                user.save()
                    .then(() => {
                        res.status(201).json({
                            message: "User Created",
                            UserDetails: user._id
                        })

                    })
                    .catch(() => {
                        res.status(503).json({ message: "Registration failed" })
                    });
            }
            else {
                // console.log("In else : " + result);
                res.status(409).json({ message: "Already a user" })
            }
        })
    }
}

module.exports.login = (req, res) => {
    const userDetails = req.body;
    if (userDetails === undefined) {
        res.json({ message: 'Data is Undefined' })
    }
    else {
        User.findOne({ email: userDetails.email })
            .then((result) => {

                if (bcrypt.compareSync(userDetails.password, result.password)) {

                    const token = jwt.sign(userDetails.email, SECRET_KEY);

                    res.status(200).json({ message: "Logged in as " + result.email + " and token is : " + token })
                } else {
                    res.status(401).json({ message: "Wrong Password" })
                }

            })
            .catch(() => {
                res.status(404).json({ message: "User Not Found" })
            })
    }

}

module.exports.getAllUsers = (req, res) => {
    User.find()
        .then((result) => {
            console.log(result);
            res.status(200).json({ result })
        })
        .catch((err) => {
            res.status(500).json({ message: "Error in Server " + err.message })
        })
}

module.exports.findUser = (req, res) => {
    const uname = req.params.username;
    User.findOne({ username: uname })
        .then((result) => {
            res.status(200).json({ message: "User Found " + result.username })
        })
        .catch(() => {
            res.status(404).json({ message: "User Not Found" })
        })
}

module.exports.editUser = (req, res) => {
    const userName = req.params.username;
    const userDetails = req.body;
    encryptedPassword = bcrypt.hashSync(userDetails.password, 10)

    const updatedUser = {
        email: userDetails.email,
        username: userName,
        password: encryptedPassword,
        name: {
            firstname: userDetails.name.firstname,
            lastname: userDetails.name.lastname
        },
        address: {
            city: userDetails.address.city,
            street: userDetails.address.street,
            zipcode: userDetails.address.zipcode
        },
        phone: userDetails.phone
    }

    User.updateOne({ username: userName }, updatedUser)
        .then((result) => {
            res.status(201).json({ message: "User Details Updated" })
        })
        .catch((err) => {
            res.status(404).json({ message: "Error : " + err.message })
        })
}

module.exports.deleteUser = (req, res) => {

    const userName = req.params.username;

    User.deleteOne({ username: userName })
        .then(() => {
            res.status(200).json({ message: "User Deleted" })
        })
        .catch((err) => {
            res.status(401).json({ message: "Error in delete :" + err.message })
        })
}