const { number } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo is working, connection is now open")
    })
    .catch(err => {
        console.log("OH NO ERROR WITH MONGO!!!!")
        console.log(err)
    })

const notificationSchema = new Schema({

    message: {
        type: String,
        required: true
    },

    read: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: false
    },

    url: {
        type: String,
        required: false
    },

    for: {
        type: String,
        required: true
    },

    date: {
        type: Number,
        required: true
    },

})

const Notifications = mongoose.model('Notifications', notificationSchema)

module.exports = Notifications











