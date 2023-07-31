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

const chatMsgSchema = new mongoose.Schema({
    
    userEmail: {
        type: String,
        required: true
    },

    displayName: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    doc: {
        type: Number,
        required: true
    },

    hidden: {
        type: String,
        required: false
    },

    post_id: {
        type: String,
        required: true
    },

   
})


const ChatMsg = mongoose.model('ChatMsg', chatMsgSchema)

module.exports = ChatMsg

