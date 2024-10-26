const express = require('express')
const bookDetailControllers = require('../controlles/bookDetailControllers')


const booksRoutes = express.Router()

booksRoutes.post('/adding',bookDetailControllers.addingBooks)
booksRoutes.get(`/findbook`,bookDetailControllers.getOnebook)
booksRoutes.put(`/update`,bookDetailControllers.updateBook)



module.exports= booksRoutes
