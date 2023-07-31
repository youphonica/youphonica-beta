const mongoose = require('mongoose');
const Concert = require('./post');
const User = require('./user')


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo is working, connection is now open")
    })
    .catch(err => {
        console.log("OH NO ERROR WITH MONGO!!!!")
        console.log(err)
    })

    
const { Schema } = mongoose;

const artistSchema = new mongoose.Schema({
    artName: {
        type: String,
        required: true
    },

    artEmail: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    bio:{
        type: String,
        required: true
    },
    
    link: {
        type: String,
        required: false
    },

    banner:{
        type: String,
        required: true
    },

    banner_key:{
        type: String,
        required: true
    },

    dateCreated: {
        type: Number,
        required: true
    },

    isVerified: {
        type: String,
        required: true
    },
    


    
    banned: {
        type: String,
        required: true
    },

    totalRevenue: {
        type: Number,
        required: true
    },

    number_of_sales: {
        type: Number,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    followers: {
        type: Number,
        required: false
    },

    stripe_acct: {
        type: String,
        required: false
    },

    charges_enabled: {
        type: String,
        required: false
    },

    transfers: {
        type: String,
        required: false
    },

    create_account_tos_agree: {
        type: String,
        required: false
    },

    connect_account_tos_agree: {
        type: String,
        required: false
    },

    stripe_acct_progress: {
        type: String,
        required: false
    },


    country: {
        type: String,
        required: true
    },

    donations: {
        type: Number,
        required: true
    },

    moneyFromDonations: {
        type: Number,
        required: true
    },


    userInfo: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],

    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Concert'
    }]
})



const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist