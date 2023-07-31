const { string, required } = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Concert = require('./post');
const Artist = require('./artist');
const Refund = require('./refund')
const { Schema } = mongoose;



mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo is working, connection is now open")
    })
    .catch(err => {
        console.log("OH NO ERROR WITH MONGO!!!!")
        console.log(err)
    })

const feedbackSchema = new mongoose.Schema({
    
    user: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    likliness: {
        type: String,
        required: true
    },

    further_comments: {
        type: String,
        required: true
    },
})




const feedback = mongoose.model('feedback', feedbackSchema)

module.exports = feedback

