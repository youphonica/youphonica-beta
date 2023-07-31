const mongoose = require('mongoose')
const User = require('./user')
const Artist = require('./artist')
const Audio = require('./audio')
const Schema = mongoose.Schema

const concertSchema = new Schema({

    artName:{
        type: String,
        required: true
    },

    artId:{
        type: String,
        required: true
    },

    userId:{
        type: String,
        required: true
    },
    
    title:{
        type: String,
        required: true
    },


    desc: {
        type: String,
        max: 100,
        required: true
    },

    img: {
        type: String,
        required: false
    },

    img_key: {
        type: String,
        required: false
    },

    preview: {
        type: String,
        required: false
    },

    video: {
        type: String,
        required: false
    },

    video_key: {
        type: String,
        required: false
    },

    tracks: {
        type: Schema.Types.ObjectId,
        ref: 'Audio',
        required: false
    },


    year: {
        type: Number,
        required: true
    },



    genre: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    rating: {
        type: String,
        required: false
    },

    price: {
        type: Number,
        required: true,
        min: 1
    },

    uploadDate: {
        type: Number,
        required: true
    },

    visibility: {
        type: String,
        required: true
    },
    


    NOP:{
        type: Number,
        required: true
    },

    revenue:{
        type: Number,
        required: true
    },


    stripe_product_id: {
        type: String,
        required: false
    },

    stripe_price_id: {
        type: String,
        required: false
    },


    stripe_acct: {
        type: String,
        required: true
    },

    merchant_country: {
        type: String,
        required: true
    },

    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },

    chat: {
        type: Schema.Types.ObjectId,
        ref: 'ChatMsg',
        required: false
    },

})

module.exports = mongoose.model('Concert', concertSchema)











