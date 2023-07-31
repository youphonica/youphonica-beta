const mongoose = require('mongoose');
const Concert = require('./post')
const { Schema } = mongoose.Schema


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo is working, connection is now open")
    })
    .catch(err => {
        console.log("OH NO ERROR WITH MONGO!!!!")
        console.log(err)
    })

const reviewScheme = new Schema({
    text:{
        type: String,
        required: true
    },
   rating:{
            type: Number,
            required: true
    }
})

module.exports = mongoose.model('Review', reviewSchema)