const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController');

router.route('/')
     .post(loginController.createUser) //craete
     .get(loginController.getAllUsers) //read

router.route('/:id')
     .get(loginController.getUserById) //read
     .patch(loginController.updateUser) //update
     .delete(loginController.deleteUser) //delete

module.exports = router