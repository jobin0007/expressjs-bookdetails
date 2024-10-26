const express = require('express')

const booksRoutes = require('./booksRoutes')
const userRoutes = require('./userRoutes')
const routes = express()


 routes.use('/books',booksRoutes)
 routes.use('/user',userRoutes)
 module.exports= routes 
