const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({

id: {
    type: Number,
    required: true
},

quote: {
    type: String,
    required: true
}

})

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote