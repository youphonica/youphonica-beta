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

const audioSchema = new Schema({

    concert_id: {
        type: String,
        required: true
    },

    track_url: {
        type: String,
        required: true
    },

    track_name: {
        type: String,
        required: true
    },

    track_key: {
        type: String,
        required: true
    },
})

const Audio = mongoose.model('Audio', audioSchema)

module.exports = Audio











