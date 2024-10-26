require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')
const cookie= require('cookie-parser')
const  routes  = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const app = express()



app.use(cookie())
app.use(express.json())
app.use(routes)
app.use(errorHandler)



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connected to db & listening port  ',process.env.PORT);
    })

})
.catch((error)=>{
    console.log(error);
})





