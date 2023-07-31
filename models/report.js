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

const reportSchema = new Schema({

    artistInvolved: {
        type: String,
        required: true
    },

    postInvolved: {
        type: String,
        required: false
    },

    reason: {
        type: String,
        required: true
    },


    date: {
        type: Number,
        required: true
    },

    details: {
        type: String,
        required: false
    },

})

const report = mongoose.model('report', reportSchema)

module.exports = report











