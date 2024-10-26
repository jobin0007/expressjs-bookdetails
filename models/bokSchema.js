const mongoose = require('mongoose')


const bookScehma = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    author:{
        type:String,
        require:true
    },
    content: {
        type: String,
        require: true
    }
})



const Books= mongoose.model('Books',bookScehma)
module.exports= Books
