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

const watchtimeSchema = new mongoose.Schema({
    
    user: {
        type: String,
        required: true
    },

    time: {
        type: Number,
        required: true
    },

    post_id: {
        type: String,
        required: true
    },

   
})




const Watchtime = mongoose.model('Watchtime', watchtimeSchema)

module.exports = Watchtime

