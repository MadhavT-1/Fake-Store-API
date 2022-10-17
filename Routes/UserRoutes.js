const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserController')

router.get('/getusers', userController.getAllUsers)
router.get('/find/:username', userController.findUser)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.put('/editUser/:username', userController.editUser)
router.delete('/remove/:username', userController.deleteUser)



module.exports = router