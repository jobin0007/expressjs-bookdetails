const express = require('express')
const userDetailControllers = require('../controlles/userDetailsControllers')
const authent = require('../middleware/authent')

const userRoutes = express.Router()
userRoutes.post('/register',userDetailControllers.register)
userRoutes.post('/login',userDetailControllers.login)
userRoutes.put('/update',authent,userDetailControllers.updateUserEmail)

module.exports= userRoutes