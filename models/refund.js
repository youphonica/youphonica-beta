const mongoose = require('mongoose');
const Concert = require('./post');
const User = require('./user')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN, mongo is working!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR WITH MONGO!!!!")
        console.log(err)
    })
const { Schema } = mongoose

const refundSchema = new Schema({

    userEmail: {
        type: String,
        required: true
    },

    dateOfRequest: {
        type: String,
        required: true
    },

    dateOfRequestFormatted: {
        type: String,
        required: true
    },

    reason: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: false
    },

    intent_id: {
        type: String,
        required: true
    },

    refunded: {
        type: String,
        required: true
    },

    user_id: {
        type: String,
        required: true
    },

    post_id: {
        type: String,
        required: true
    },


    cus_id: {
        type: String,
        required: true
    },

    amountPaid: {
        type: Number,
        required: true
    },
})



const Refund = mongoose.model('Refund', refundSchema)

module.exports = Refund